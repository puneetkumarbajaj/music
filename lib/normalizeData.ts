export function normalizeTrackData(source: 'spotify' | 'apple', data: any): Track {
    if (source === 'spotify') {
        return {
            album: {
                album_type: data.album.album_type,
                artists: data.album.artists.map((artist: any) => normalizeSimplifiedArtistData('spotify', artist)),
                href: data.album.href,
                id: data.album.id,
                image: data.album.images[0],
                name: data.album.name,
                release_date: data.album.release_date_precision === 'day' ? data.album.release_date : data.album.release_date + '-01-01',
                total_tracks: data.album.total_tracks,
                uri: data.album.uri
            },
            artists: data.artists.map((artist: any) => normalizeArtistData('spotify', artist)),
            available_markets: data.available_markets,
            duration_ms: data.duration_ms,
            explicit: data.explicit,
            href: data.href,
            isrc: data.external_ids.isrc,
            id: data.id,
            is_playable: data.is_playable,
            name: data.name,
            popularity: data.popularity,
            preview_url: data.preview_url,
            track_number: data.track_number,
            uri: data.uri
        }
    } else {
        return {
            album: {
                name: data.attributes.albumName,
                image: data.attributes.artwork,
                release_date: data.attributes.releaseDate,
            },
            artist: data.attributes.artistName,
            duration_ms: data.attributes.durationInMillis,
            explicit: data.attributes.contentRating === 'explicit',
            href: data.href,
            id: data.id,
            name: data.attributes.name,
            track_number: data.attributes.trackNumber,
            hasLyrics: data.attributes.hasLyrics,
            hasCredits: data.attributes.hasCredits,
            genres: data.attributes.genreNames,
        }
    }
}


function normalizeArtistData(source: 'spotify' | 'apple', data: any): Artist {
    if (source === 'spotify') {
        return {
            followers: data.followers,
            genres: data.genres,
            href: data.href,
            id: data.id,
            name: data.name,
            popularity: data.popularity,
            uri: data.uri
        }
    } else {
        return {
            followers: data.followers,
            genres: data.genres,
            href: data.href,
            id: data.id,
            name: data.name,
            popularity: data.popularity,
            uri: data.uri
        }
    }


}

function normalizeSimplifiedArtistData(source: 'spotify' | 'apple', data: any): SimplifiedArtist {
    if (source === 'spotify') {
        return {
            href: data.href,
            id: data.id,
            name: data.name,
            type: data.type,
            uri: data.uri
        }
    } else {
        return {
            href: data.href,
            id: data.id,
            name: data.name,
            type: data.type,
            uri: data.uri
        }
    }

}

function normalizeOwnerData(source: 'spotify' | 'apple', data: any): Owner {
    if (source === 'spotify') {
        return {
            followers: data.followers,
            href: data.href,
            id: data.id,
            type: data.type,
            uri: data.uri,
            name: data.display_name
        }
    } else {
        return {
            followers: data.followers,
            href: data.href,
            id: data.id,
            type: data.type,
            uri: data.uri,
            name: data.display_name
        }
    }

}

export function normalizePlaylistData(source: 'spotify' | 'apple', PlaylistData: any): Playlist {
    if (source === 'spotify') {
        const normalizedTracks = PlaylistData.tracks.items.map((item: any) => ({
            added_at: item.added_at,
            added_by: {
                followers: item.added_by.followers,
                href: item.added_by.href,
                id: item.added_by.id,
                type: item.added_by.type,
                uri: item.added_by.uri
            },
            track: normalizeTrackData('spotify', item.track)
        }));

        return{
            collaborative: PlaylistData.collaborative,
            description: PlaylistData.description,
            href: PlaylistData.href,
            followers: PlaylistData.followers,
            id: PlaylistData.id,
            image: PlaylistData.images[0],
            name: PlaylistData.name,
            owner: normalizeOwnerData('spotify', PlaylistData.owner),
            public: PlaylistData.public,
            tracks: {
                href: PlaylistData.tracks.href,
                total: PlaylistData.tracks.total,
                items: normalizedTracks
            },
            uri: PlaylistData.uri,
            type: PlaylistData.type
        }
    } else {
        const normalizedTracks = PlaylistData.relationships.tracks.data.map((item: any) => ({
            track: normalizeTrackData('apple', item)
        }));

        return{
            id: PlaylistData.id,
            href: PlaylistData.href,
            type: PlaylistData.type,
            image: PlaylistData.attributes.artwork,
            description: PlaylistData.attributes.description?.standard,
            public: PlaylistData.attributes.isPublic,
            name: PlaylistData.attributes.name,
            tracks: {
                total: PlaylistData.relationships.tracks.meta.total,
                href: PlaylistData.relationships.tracks.href,
                items: normalizedTracks
            }
        }
    }
}

export function normalizeCategoryData(source: 'spotify' | 'apple', data: any): Category {
    if (source === 'spotify') {
        return {
            href: data.href,
            icons: data.icons[0],
            id: data.id,
            name: data.name
        }
    } else {
        return {
            href: data.href,
            id: data.id,
            name: data.attributes.title.stringForDisplay,
            playlists: data.relationships.contents.data.map((item: any) => normalizeSimplifiedPlaylistData('apple', item))
        }
    }
}

export function normalizeCategoryPlaylistData(source: 'spotify' | 'apple', data: any): CategoryPlaylists {
    if (source === 'spotify') {
        return {
            description: data.message,
            playlists: {
                href: data.playlists.href,
                total: data.playlists.total,
                items: data.playlists.items.map((item: any) => normalizePlaylistData('spotify', item))
            }
        }
    } else {
        return {
            description: data.message,
            playlists: {
                href: data.playlists.href,
                total: data.playlists.total,
                items: data.playlists.items.map((item: any) => normalizePlaylistData('spotify', item))
            }
        }
    }
}

export function normalizeRecentlyPlayedData(source: 'spotify' | 'apple', data: any): RecentlyPlayed {
    if (source === 'spotify') {
        return {
            items: data.items.map((item: any) => ({
                track: normalizeTrackData('spotify', item.track),
                played_at: item.played_at
            })),
            total: data.total,
            href: data.href
        }
    } else {
        return {
            items: data.items.map((item: any) => ({
                track: normalizeTrackData('spotify', item.track),
                played_at: item.played_at
            })),
            total: data.total,
            href: data.href
        }
    }
}

export function normalizeSimplifiedPlaylistData(source: 'spotify' | 'apple', data: any): SimplifiedPlaylist {
    if (source === 'spotify') {
        return {
            collaborative: data.collaborative,
            description: data.description,
            href: data.href,
            id: data.id,
            image: data.images[0],
            name: data.name,
            owner: normalizeOwnerData('spotify', data.owner),
            public: data.public,
            tracks: {
                href: data.tracks.href,
                total: data.tracks.total
            },
            type: data.type,
            uri: data.uri
        }
    } else {
        return {
            id: data.id,
            href: data.href,
            type: data.type,
            name: data.attributes.name,
            description: data.attributes.description?.standard,
            artwork: data.attributes.artwork,
            public: data.attributes.isPublic,
            uri: data.attributes.url
        }
    }
}