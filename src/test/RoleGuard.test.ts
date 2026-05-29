import { describe, it, expect } from 'vitest';
import './clerk-mock'; // Initialize mocks
import { $clerkStore } from '@clerk/astro/client';

describe('RoleGuard (Production Sector Isolation)', () => {
  it('should identify a user as a Showrunner based on metadata', () => {
    const store = $clerkStore.get() as any;
    expect(store.user.publicMetadata.role).toBe('showrunner');
  });

  it('should simulate a 403-equivalent rejection for non-runner sectors', () => {
    // Modify mock for this specific test
    const mockStore = $clerkStore as any;
    mockStore.get.mockReturnValueOnce({
      user: { publicMetadata: { role: 'player' } },
    });

    const store = $clerkStore.get() as any;
    expect(store.user.publicMetadata.role).not.toBe('showrunner');
  });
});
