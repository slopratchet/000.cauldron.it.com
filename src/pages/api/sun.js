export const GET = async (context) => {
  const { request, url, locals } = context;
  const upgradeHeader = request.headers.get('Upgrade');

  // 1. Resolve Auth Identity from the Astro Middleware layer
  // Fail-secure check: Ensures Clerk middleware bound correctly before accessing it
  if (typeof locals.auth !== 'function') {
    return new Response(
      JSON.stringify({ error: 'Auth context initialization error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const authObject = locals.auth();

  // --- Case 1: Handle Incoming WebSocket Handshakes ---
  if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
    try {
      const targetUrl = new URL(
        'https://worker-warden.berad4000.workers.dev/ws',
      );

      // Check if user is authenticated via Clerk before opening up the WebSocket proxy pipe
      if (authObject.userId) {
        // Fetch a short-lived Clerk session token generated on the server side
        const token = await authObject.getToken();
        if (token) {
          targetUrl.searchParams.set('jwt', token);
        }
      } else {
        // If an unauthenticated request attempts to hit the WS route directly,
        // fall back to inspecting incoming URL parameters
        const clientJwt = url.searchParams.get('jwt');
        if (clientJwt) {
          targetUrl.searchParams.set('jwt', clientJwt);
        }
      }

      // Proxy the upgrade request down to the Warden Worker
      console.log(
        `[SUN-PROXY] ☀️ Forwarding WebSocket handshake to Warden Worker...`,
      );
      return await fetch(targetUrl.toString(), {
        headers: request.headers,
      });
    } catch (e) {
      return new Response('WebSocket proxy connection failed: ' + e.message, {
        status: 502,
      });
    }
  }

  // --- Case 2: Standard HTTP Fallback Route Handling ---
  const queryFn = async () => {
    // If the request is a standard HTTP GET, don't ping the /ws route.
    // Target a proper data endpoint on Warden instead (like /gatekeeper or /server)
    const targetEndpoint =
      'https://worker-warden.berad4000.workers.dev/gatekeeper';

    // Create cloned headers to propagate authorization metadata down to your worker
    const headers = new Headers(request.headers);
    if (authObject.userId) {
      const token = await authObject.getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    const response = await fetch(targetEndpoint, { headers });

    if (!response.ok) {
      throw new Error(`Warden responded with status: ${response.status}`);
    }

    // Verify whether Warden replied with plain text or standard JSON payloads
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return response.json();
    } else {
      return { message: await response.text() };
    }
  };

  console.log('[SUN-PROXY] 🌙 The moon is going down, the sun is going up...');
  console.log('[SUN-PROXY] 📡 Sending HTTP request to Gatekeeper...');

  try {
    const bit = await queryFn();
    return new Response(JSON.stringify(bit), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
