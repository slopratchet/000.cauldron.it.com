import { clerkMiddleware } from '@clerk/astro/server';
import { defineMiddleware, sequence } from 'astro:middleware';
import { env as cfEnv } from 'cloudflare:workers';

/**
 * PROTOCOL_ACCESS_ORCHESTRATOR
 * 1. Initialize Clerk (Auth Impulse)
 * 2. Enforce Role-Based Boundaries (Sector Isolation)
 */
export const onRequest = sequence(
  defineMiddleware(async (context, next) => {
    // Extract keys from Cloudflare runtime or local env shims
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
          'DEV/TEST/CI MODE: Bypassing Clerk middleware to prevent keyless handshake failures.',
        );
        // Provide mock locals.auth so the app doesn't crash on auth calls
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
    }

    // Initialize Clerk dynamically for this request context
    const handler = clerkMiddleware({
      publishableKey,
      secretKey,
    });

    return handler(context, next);
  }),
  defineMiddleware(async ({ locals, request, redirect }, next) => {
    // DEV BYPASS: Allow full access in local development
    if (import.meta.env.DEV) {
      return next();
    }

    // Safety check: ensure the Auth impulse is active
    if (typeof locals.auth !== 'function') {
      return next();
    }

    const auth = locals.auth();
    const { pathname } = new URL(request.url);

    // Redirect authenticated users away from public pages (like login)
    // to their project-status dashboard.
    const authPaths = ['/', '/log-in', '/login', '/signup'];
    const isAuthPath = authPaths.some(
      (path) => pathname === path || pathname.startsWith(path + '/'),
    );

    if (auth.userId && isAuthPath) {
      const role =
        auth.sessionClaims?.metadata?.role || auth.sessionClaims?.role;
      if (role !== 'showrunner') {
        return redirect('/project-status');
      }
    }

    // GATE 1: Unauthorized access to protected sectors
    // (If the user isn't logged in and tries to access non-public routes)
    const publicPaths = [
      '/',
      '/log-in',
      '/signup',
      '/api/moon',
      '/api/gitAgent',
      '/guest',
      '/market',
      '/screen',
    ];
    const isPublic = publicPaths.some(
      (path) => pathname === path || pathname.startsWith(path + '/'),
    );

    if (!auth.userId && !isPublic) {
      return redirect('/log-in');
    }

    //DISABLING THIS relaTED TO RUNNER FOR NOW
    // GATE 2: Role-based isolation for the 'Runner' sector
    // Redirect non-Showrunners back to the Player Dashboard
    //if (pathname.startsWith('/runner')) {

    //}

    return next();
  }),
);
