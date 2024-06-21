import * as React from 'react';
import Image from "next/image";
import { IoEllipsisHorizontal } from 'react-icons/io5';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface SongCardProps {
    track: Track;
}

export const SongCard: React.FC<SongCardProps> = ({ track }) => {
  const { name, album, artists, explicit } = track;

  return (
    <div className='flex items-center justify-center max-h-[55px] mx-auto gap-6 w-72'>
        <Image
            src={album.image.url || '/default-album.png'}
            alt={`Cover for ${name}`}
            height={40}
            width={40}
            className="rounded" // Example of adding rounded corners
        />
        <div className='flex-1 flex-col overflow-hidden'>
            <div className='flex'>
                <h4 className="text-sm font-semibold truncate">{name}</h4>
                {explicit && <span className="text-xs bg-secondary px-1 ml-2 rounded">E</span>}
            </div>
            <p className="text-xs text-muted-foreground truncate">
                {Array.isArray(artists) ? (
                    artists.map((artist, index) => (
                    <span key={index}>
                        {artist.name}{index < artists.length - 1 ? ', ' : ''}
                    </span>
                    ))
                ) : (
                    <span>{artists}</span>
                )}
            </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button aria-label="Options" className="p-2">
                    <IoEllipsisHorizontal className="text-lg text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => console.log('Save to Your Library')}>Save to Your Library</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Add to Playlist')}>Add to Playlist</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => console.log('Start Radio')}>Start Radio</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
