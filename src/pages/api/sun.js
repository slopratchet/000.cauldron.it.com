export const GET = async ({ request }) => {
  const upgradeHeader = request.headers.get('Upgrade');
  if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
    try {
      return await fetch('https://worker-warden.berad4000.workers.dev/ws', {
        headers: request.headers,
      });
    } catch (e) {
      return new Response('WebSocket connection failed: ' + e.message, {
        status: 502,
      });
    }
  }

  const queryFn = async () => {
    const response = await fetch(
      'https://worker-warden.berad4000.workers.dev/ws',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  console.log('the moon is going down ');
  console.log('the sun is going up ');

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
