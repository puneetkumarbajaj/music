interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyImageObject {
  url: string;
  height: number;
  width: number;
}

interface SpotifyFollowers {
  href: string;
  total: number;
}

interface SpotifyOwner {
    external_urls: SpotifyExternalUrls;
    followers: SpotifyFollowers;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}


interface SpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  followers: SpotifyFollowers;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  owner: SpotifyOwner;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: [
      {
        added_at: string;
        added_by: {
          external_urls: SpotifyExternalUrls;
          followers: SpotifyFollowers;
          href: string;
          id: string;
          type: string;
          uri: string;
        };
        is_local: boolean;
        track: SpotifyTrack;
      }
    ];
  };
  type: string;
  uri: string;
}


interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface SpotifySimplifiedArtist {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface SpotifyTrack {
  album: {
    album_type: string;
    artists: SpotifySimplifiedArtist[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImageObject[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface SpotifySimplifiedPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  owner: SpotifyOwner;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
}



interface SpotifyCategory {
  href: string;
  icons: SpotifyImageObject[];
  id: string;
  name: string;
}

interface SpotifyCategoryPlaylists {
    message: string;
    playlists: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: SpotifyPlaylist[];
    };
}


interface SpotifyRecentlyPlayed {
  items: SpotifyPlayHistory[];
  next: string;
  cursors: {
    after: string;
  };
  limit: number;
  total: number;
  href: string;
}

interface SpotifyPlayHistory {
  track: SpotifyTrack;
  played_at: string;
  context: {
    external_urls: SpotifyExternalUrls;
    href: string;
    type: string;
    uri: string;
  };
}