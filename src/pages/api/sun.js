export const GET = async () => {
  const queryFn = async () => {
    const response = await fetch(
      'https://worker-sower.berad4000.workers.dev/ws',
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
