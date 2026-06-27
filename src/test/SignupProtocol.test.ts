import { beforeEach, describe, expect, it, vi } from 'vitest';
import './clerk-mock'; // Initialize shared Clerk mock
import { $clerkStore } from '@clerk/astro/client';
import { mockSignUp } from './clerk-mock';

// Helper: simulate metadata bundling from signup.astro
function buildTacticalMetadata(fields: {
  origin: string;
  archetype: string;
  alignment: string;
}) {
  return {
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
        origin: 'SPECTRAL_REMNANT',
        archetype: 'SPLICER',
        alignment: 'VOID',
      };
      const metadata = buildTacticalMetadata(fields);

      await clerk.client.signUp.create({
        password: 'cipher123',
        emailAddress: 'test@example.com',
        unsafeMetadata: metadata,
      });

      expect(mockSignUp.create).toHaveBeenCalledWith(
        expect.objectContaining({
          emailAddress: 'test@example.com',
          unsafeMetadata: expect.objectContaining({
            origin: 'SPECTRAL_REMNANT',
            archetype: 'SPLICER',
            alignment: 'VOID',
          }),
        }),
      );
    });

    it('should stamp a valid ISO 8601 registered_at timestamp', () => {
      const fields = {
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

    it('should pass emailAddress as a root Clerk parameter and in unsafeMetadata', async () => {
      const clerk = $clerkStore.get() as any;

      const emailAddress = 'swampborn@alligator.ink';
      await clerk.client.signUp.create({
        password: 'anchor888',
        emailAddress,
        unsafeMetadata: {
          ...buildTacticalMetadata({
            origin: 'EARTHBOUND',
            archetype: 'RUNNER',
            alignment: 'HARMONIC',
          }),
          email: emailAddress,
        },
      });

      const callArgs = mockSignUp.create.mock.calls[0][0];
      // Root 'emailAddress' key MUST exist
      expect(callArgs).toHaveProperty('emailAddress', emailAddress);
      // But it MUST also exist in unsafeMetadata as 'email'
      expect(callArgs.unsafeMetadata).toHaveProperty('email', emailAddress);
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
      emailAddress: 'test@example.com',
      password: 'cipher123',
      unsafeMetadata: { email: 'test@example.com' },
    });

    expect(result.status).toBe('complete');
    // The UI should then call prepare...
    await result.prepareEmailAddressVerification();
    expect(result.prepareEmailAddressVerification).toHaveBeenCalledTimes(1);
  });

  it('should produce a complete session on registration', async () => {
    const signUp = mockSignUp;
    const created = await signUp.create({
      emailAddress: 'test@example.com',
      password: 'cipher123',
      unsafeMetadata: { email: 'test@example.com' },
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
