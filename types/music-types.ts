 interface Followers {
    href: string;
    total: number;
  }
  
  interface Owner {
      followers: Followers;
      href: string;
      id: string;
      type: string;
      uri: string;
      name: string;
  }
  
  interface ImageObject{
        height: number;
        url: string;
        width: number;
  }
  
  interface Playlist {
    collaborative?: boolean;
    description: string;
    href: string;
    followers?: Followers;
    id: string;
    image: ImageObject;
    name: string;
    owner?: Owner;
    public: boolean;
    tracks: {
      href?: string;
      total: number;
      items: [
        {
          added_at?: string;
          added_by?: {
            followers: Followers;
            href: string;
            id: string;
            type: string;
            uri: string;
          };
          track: Track;
        }
      ];
    };
    uri?: string;
    type: string;
  }
  
  
  interface Artist {
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    name: string;
    popularity: number;
    uri: string;
  }
  
  interface SimplifiedArtist {
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  interface Track {
    album: {
      album_type?: string;
      artists?: SimplifiedArtist[];
      href?: string;
      id?: string;
      image: ImageObject;
      name: string;
      release_date: string;
      total_tracks?: number;
      uri?: string;
    };
    artists?: Artist[];
    artist? : string;
    available_markets?: string[];
    duration_ms: number;
    explicit: boolean;
    isrc?: string;
    href: string;
    id: string;
    is_playable?: boolean;
    name: string;
    popularity?: number;
    preview_url?: string;
    track_number: number;
    uri?: string;
    hasLyrics?: boolean;
    hasCredits?: boolean;
    genres?: string[];
  }
  
  interface SimplifiedPlaylist {
    collaborative?: boolean;
    description: string;
    href: string;
    id: string;
    image: ImageObject;
    name: string;
    owner?: Owner;
    public: boolean;
    tracks?: { href: string; total: number };
    type: string;
    uri?: string;
  }
  
  
  
  interface Category {
    href: string;
    icons: ImageObject;
    id: string;
    name: string;
  }
  
  interface CategoryPlaylists {
      description: string;
      playlists: {
          href: string;
          total: number;
          items: Playlist[];
      };
  }
  
  
  interface RecentlyPlayed {
    items: PlayHistory[];
    total: number;
    href: string;
  }
  
  interface PlayHistory {
    track: Track;
    played_at: string;
  }