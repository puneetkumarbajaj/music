import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

import { Playlist } from "@/data/playlists"
import { Icons } from "./icons"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
  view: string;
  setView: (view: string) => void;
  setGlobalPlaylistId: (id: string | null) => void;
}

export function Sidebar({ className, playlists,setView, view, setGlobalPlaylistId }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button variant={view==="listen-now" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("listen-now")}>
              <Icons.listenNow />
              Listen Now
            </Button>
            <Button variant={view==="browse" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("browse")}>
              <Icons.browse />
              Browse
            </Button>
            <Button variant={view==="radio" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("radio")}>
              <Icons.radio/>
              Radio
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            <Button variant={view==="playlists" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("playlists")}>
              <Icons.playlist/>
              Playlists
            </Button>
            <Button variant={view==="songs" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("songs")}>
              <Icons.songs/>
              Songs
            </Button>
            <Button variant={view==="made-for-you" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("made-for-you")}>
              <Icons.person/>
              Made for You
            </Button>
            <Button variant={view==="artists" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("artists")}>
              <Icons.mic/>
              Artists
            </Button>
            <Button variant={view==="albums" ? "secondary" : "ghost"} className="w-full justify-start" onClick={()=> setView("albums")}>
              <Icons.albums/>
              Albums
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  //variant={view==="playlist" ? "secondary" : "ghost"}
                  className="w-full justify-start font-normal"
                  onClick={()=> {
                    setView("playlist")
                    //setGlobalPlaylistId(playlist.id)
                  }}
                >
                  <Icons.playlist/>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
