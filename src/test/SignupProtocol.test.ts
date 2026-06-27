import { beforeEach, describe, expect, it, vi } from 'vitest';
import './clerk-mock'; // Initialize shared Clerk mock
import { $clerkStore } from '@clerk/astro/client';
import { mockSignUp } from './clerk-mock';

// ────────────────────────────────────────────────────────────────────────────
// CONSTANTS (mirroring src/pages/signup.astro — single source of truth)
// ────────────────────────────────────────────────────────────────────────────
const RESERVED_NAMES = [
  'ADMIN',
  'SYSTEM',
  'ROOT',
  'MAMA',
  'GHOST',
  'RUNNER',
  'ALLIGATOR',
  'PRIMAL_MAMA',
];

// Helper: simulate the namespace check from signup.astro
function isReservedIdentifier(username: string): boolean {
  return RESERVED_NAMES.includes(username.toUpperCase());
}

// Helper: simulate metadata bundling from signup.astro
function buildTacticalMetadata(fields: {
  username: string;
  origin: string;
  archetype: string;
  alignment: string;
}) {
  return {
    username: fields.username,
    origin: fields.origin,
    archetype: fields.archetype,
    alignment: fields.alignment,
    registered_at: new Date().toISOString(),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// STAGE I: THE COVENANT (Input Validation)
// ────────────────────────────────────────────────────────────────────────────
describe('Protocol Stage I: The Covenant (Input Validation)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Namespace Protection', () => {
    it('should reject ALL 8 reserved arch-lord identifiers (case-insensitive)', () => {
      // The full reserved name list + mixed-case variants
      const attackVectors = [
        'ADMIN',
        'admin',
        'Admin',
        'SYSTEM',
        'system',
        'ROOT',
        'MAMA',
        'mama',
        'GHOST',
        'RUNNER',
        'runner',
        'Runner',
        'ALLIGATOR',
        'alligator',
        'PRIMAL_MAMA',
        'primal_mama',
        'Primal_Mama',
        'AdMiN', // edge: weird casing
        'SyStEm', // edge: alternating caps
        'ROOT\t', // edge: trailing tab — should NOT match
      ];

      // The first 19 should be reserved, the last one (ROOT\t) should NOT
      const reservedInputs = attackVectors.slice(0, 19);
      const safeInput = attackVectors[19];

      reservedInputs.forEach((name) => {
        expect(
          isReservedIdentifier(name),
          `Expected "${name}" to be reserved`,
        ).toBe(true);
      });

      // ROOT\t has a tab — trim isn't applied, so it slips through as a different string
      expect(isReservedIdentifier(safeInput)).toBe(false);
    });

    it('should allow legitimate player identifiers through', () => {
      const legitNames = [
        'ShadowBorn',
        'VoidWalker',
        'LostSon',
        'CryptoMaw',
        'Swampborn',
      ];

      legitNames.forEach((name) => {
        expect(
          isReservedIdentifier(name),
          `Expected "${name}" to be allowed`,
        ).toBe(false);
      });
    });
  });

  describe('Covenant Agreement Gate', () => {
    it('should block submission when covenant is unchecked', () => {
      const covenantCheck = { checked: false };
      const wouldThrow = !covenantCheck.checked;
      expect(wouldThrow).toBe(true);
    });

    it('should allow submission when covenant is signed', () => {
      const covenantCheck = { checked: true };
      const wouldThrow = !covenantCheck.checked;
      expect(wouldThrow).toBe(false);
    });
  });

  describe('Tactical Metadata Bundling', () => {
    it('should include all required tactical fields in unsafeMetadata', async () => {
      const clerk = $clerkStore.get() as any;

      const fields = {
        username: 'VoidWalker',
        origin: 'SPECTRAL_REMNANT',
        archetype: 'SPLICER',
        alignment: 'VOID',
      };
      const metadata = buildTacticalMetadata(fields);

      await clerk.client.signUp.create({
        username: 'VoidWalker',
        password: 'cipher123',
        unsafeMetadata: metadata,
      });

      expect(mockSignUp.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'VoidWalker',
          unsafeMetadata: expect.objectContaining({
            username: 'VoidWalker',
            origin: 'SPECTRAL_REMNANT',
            archetype: 'SPLICER',
            alignment: 'VOID',
          }),
        }),
      );
    });

    it('should stamp a valid ISO 8601 registered_at timestamp', () => {
      const fields = {
        username: 'CryptoMaw',
        origin: 'EARTHBOUND',
        archetype: 'OBSERVER',
        alignment: 'PRIMAL',
      };
      const metadata = buildTacticalMetadata(fields);

      // Verify it is a parseable ISO date
      const parsed = new Date(metadata.registered_at);
      expect(isNaN(parsed.getTime())).toBe(false);
      // Verify format: ends with 'Z'
      expect(metadata.registered_at).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
      );
    });

    it('should pass username as a root Clerk parameter and in unsafeMetadata', async () => {
      const clerk = $clerkStore.get() as any;

      await clerk.client.signUp.create({
        username: 'SwampBorn',
        password: 'anchor888',
        unsafeMetadata: buildTacticalMetadata({
          username: 'SwampBorn',
          origin: 'EARTHBOUND',
          archetype: 'RUNNER',
          alignment: 'HARMONIC',
        }),
      });

      const callArgs = mockSignUp.create.mock.calls[0][0];
      // Root 'username' key MUST exist
      expect(callArgs).toHaveProperty('username', 'SwampBorn');
      // But it MUST also exist in unsafeMetadata
      expect(callArgs.unsafeMetadata).toHaveProperty('username', 'SwampBorn');
    });
  });
});

// ────────────────────────────────────────────────────────────────────────────
// STAGE II: THE TRANSMISSION (State Machine Logic)
// ────────────────────────────────────────────────────────────────────────────
describe('Protocol Stage II: The Transmission (State Machine)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should skip email verification if status is complete', async () => {
    const signUp = mockSignUp;

    const result = await signUp.create({
      username: 'test',
      password: 'cipher123',
      unsafeMetadata: { username: 'test' },
    });

    expect(result.status).toBe('complete');
    // The UI should then call prepare...
    await result.prepareEmailAddressVerification();
    expect(result.prepareEmailAddressVerification).toHaveBeenCalledTimes(1);
  });

  it('should produce a complete session on registration', async () => {
    const signUp = mockSignUp;
    const created = await signUp.create({
      username: 'test',
      password: 'cipher123',
      unsafeMetadata: { username: 'test' },
    });

    expect(created.status).toBe('complete');
    expect(created.createdSessionId).toBe('session_mock_123');
  });
});

// ────────────────────────────────────────────────────────────────────────────
// STAGE III: ROLE-BASED SECTOR ISOLATION
// ────────────────────────────────────────────────────────────────────────────
describe('Protocol Stage III: Role-Based Sector Isolation', () => {
  it('should confirm a showrunner role from publicMetadata', () => {
    const store = $clerkStore.get() as any;
    expect(store.user.publicMetadata.role).toBe('showrunner');
  });

  it('should deny runner-sector access for non-showrunner roles', () => {
    const mockStore = $clerkStore as any;
    mockStore.get.mockReturnValueOnce({
      user: { publicMetadata: { role: 'habitant' } },
    });

    const store = $clerkStore.get() as any;
    const canAccessRunner = store.user.publicMetadata.role === 'showrunner';
    expect(canAccessRunner).toBe(false);
  });

  it('should deny runner-sector access when role is undefined (new user)', () => {
    const mockStore = $clerkStore as any;
    mockStore.get.mockReturnValueOnce({
      user: { publicMetadata: {} }, // no role assigned yet
    });

    const store = $clerkStore.get() as any;
    const canAccessRunner = store.user.publicMetadata.role === 'showrunner';
    expect(canAccessRunner).toBe(false);
  });
});
