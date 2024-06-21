export async function fetchPlaylists(accessToken: string, userId: string): Promise<SpotifyPlaylist[]> {
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error; // Re-throw the error if you want calling code to handle it
    }
}

export async function fetchPlaylistData(accessToken: string, playlistId: string): Promise<SpotifyPlaylist> {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }   catch (error) {
        console.error('Error fetching playlist:', error);
        throw error;
    }
}

export async function fetchSongData(accessToken: string, trackId: string): Promise<SpotifyTrack> {
    try{
        const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching song:', error);
        throw error; 
    }
}

export async function getCurrentlyPlaying(accessToken: string) {
    const res = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    return data;
}

export async function playSong(accessToken: string, deviceId: string, uri: string) {
    const res = await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        device_id: deviceId
      },
      body: JSON.stringify({ uris: [uri] })
    });
    return res;
}

export async function getIsrc(accessToken: string, trackId: string) {
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    return data.external_ids.isrc;
}

export async function getIsrcOfPlaylist(accessToken: string, playlistId: string) {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    return data.tracks.items.map((item: any) => item.track.external_ids.isrc);
}

export async function getFeaturedPlaylists(accessToken: string) :  Promise<SpotifyPlaylist[]>{
    const res = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    return data?.playlists?.items;
}


export async function getCategories(accessToken: string) : Promise<SpotifyCategory[]> {
    const res = await fetch(`https://api.spotify.com/v1/browse/categories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    return data.categories.items;
}

export async function getCategoryPlaylists(accessToken: string, categoryId: string) : Promise<SpotifyPlaylist[]> {
    const res = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    return data.playlists.items;
}

export async function getCategoriesForListenNow(accessToken: string) : Promise<SpotifyCategory[]> {
  const res = await fetch(`https://api.spotify.com/v1/browse/categories?limit=5`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const data = await res.json();
  return data.categories.items;
}