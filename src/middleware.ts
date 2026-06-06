import { clerkMiddleware } from '@clerk/astro/server';
import { defineMiddleware, sequence } from 'astro:middleware';
import { env as cfEnv } from 'cloudflare:workers';

// ==========================================
// 1. ACCESS CONTROL CONFIGURATION (ACL)
// ==========================================

/**
 * Strict structural definitions for our network sectors.
 * Add new paths here to scale without touching engine logic.
 */
const ACCESS_CONFIG = {
  publicPrefixes: [
    '/know',
    '/log-in',
    '/signup',
    '/api/moon',
    '/api/gitAgent',
    '/guest',
    '/market',
    '/location',
    '/actor',
    '/action',
    '/script',
    '/sheet',
  ],
  publicExact: ['/'],
  // Paths reserved strictly for authenticating users to prevent auth-looping
  authGateways: ['/', '/log-in', '/login', '/signup'],
};

/**
 * Evaluates whether a given pathname belongs to a public sector.
 */
function isPublicRoute(pathname: string): boolean {
  if (ACCESS_CONFIG.publicExact.includes(pathname)) return true;
  return ACCESS_CONFIG.publicPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Evaluates whether a route is an authentication entry point.
 */
function isAuthGateway(pathname: string): boolean {
  return ACCESS_CONFIG.authGateways.some(
    (gate) => pathname === gate || pathname.startsWith(`${gate}/`),
  );
}

// ==========================================
// 2. MIDDLEWARE ENGINE
// ==========================================

export const onRequest = sequence(
  /**
   * PHASE 1: AUTH IMPULSE INITIALIZATION
   * Resolves environment variables, handles test shims, and invokes Clerk.
   */
  defineMiddleware(async (context, next) => {
    const env = cfEnv || (globalThis as any).process?.env || import.meta.env;
    const publishableKey = env.PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = env.CLERK_SECRET_KEY;

    if (!publishableKey || !secretKey) {
      console.warn(
        'CRITICAL: Clerk keys are missing from the runtime environment.',
      );

      const isDevOrTest =
        import.meta.env.DEV ||
        (globalThis as any).process?.env?.NODE_ENV === 'test' ||
        (globalThis as any).process?.env?.CI === 'true';

      if (isDevOrTest) {
        console.warn(
          'DEV/TEST/CI MODE: Injecting mock authentication context.',
        );
        context.locals.auth = () => ({
          userId: null,
          sessionId: null,
          actor: null,
          orgId: null,
          orgRole: null,
          orgSlug: null,
          orgPermissions: null,
          claims: null,
          sessionClaims: null,
          user: null,
        });
        return next();
      }

      // Production fail-closed state if keys are completely missing
      return new Response('Security Architecture Misconfiguration', {
        status: 500,
      });
    }

    // Execute the Clerk engine with the extracted edge environment context
    return clerkMiddleware({ publishableKey, secretKey })(context, next);
  }),

  /**
   * PHASE 2: SECTOR ISOLATION & RBAC
   * Enforces security boundaries based on the resolved Auth identity.
   */
  defineMiddleware(async ({ locals, request, redirect }, next) => {
    // DEV BYPASS: Retained for localized speed. Remove if testing local RBAC.
    if (import.meta.env.DEV) {
      return next();
    }

    // Fail-secure: If Clerk didn't bind properly, do not allow traffic to fall through
    if (typeof locals.auth !== 'function') {
      console.error(
        'CRITICAL: Authentication context missing from lifecycle execution.',
      );
      return new Response('Unauthorized Lifecycle Error', { status: 401 });
    }

    const auth = locals.auth();
    const { pathname } = new URL(request.url);

    // --- GATE 1: REDIRECT AUTHENTICATED USERS AWAY FROM PUBLIC AUTH PATHS ---
    if (auth.userId && isAuthGateway(pathname)) {
      const role =
        auth.sessionClaims?.metadata?.role || auth.sessionClaims?.role;

      if (role === 'artist') {
        return redirect('/project-status');
      } else {
        return redirect('/lobby');
      }
    }

    // --- GATE 2: PROTECT PRIVATE SECTORS FROM ANONYMOUS IMPULSES ---
    if (!auth.userId && !isPublicRoute(pathname)) {
      return redirect('/log-in');
    }

    // --- GATE 3: FUTURE RBAC SECTOR ISOLATION (E.G., RUNNER INFRASTRUCTURE) ---
    if (pathname.startsWith('/runner')) {
      const role =
        auth.sessionClaims?.metadata?.role || auth.sessionClaims?.role;
      if (role !== 'artist') {
        // Enforce a hard 404/403 or redirect to obscure high-clearance sectors
        return redirect('/runner/iframe');
      }
    }

    return next();
  }),
);
