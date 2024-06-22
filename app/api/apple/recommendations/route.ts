import fetch from 'node-fetch';

export async function POST(request: Request) {
  const developerToken = process.env.APPLE_MUSIC_DEVELOPER_TOKEN; // Corrected the variable name for security
  const userToken = request.headers.get('token');

  try {
    const apiUrl = 'https://api.music.apple.com/v1/me/recommendations';
    const response = await fetch(apiUrl, {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${developerToken}`,
        'Music-User-Token': userToken || '',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Convert response to JSON
    return new Response(JSON.stringify(data), {  // Return the JSON data
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: unknown) {
    console.error('Fetch failed:', error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response('An unexpected error occurred', {
        status: 500
      });
    }
  }
}
