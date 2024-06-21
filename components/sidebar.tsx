import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { useSession } from "next-auth/react"
import { Icons } from "./icons"
import React from "react"
import { fetchPlaylists } from "@/lib/Spotifymethods"
import { normalizeSimplifiedPlaylistData } from "@/lib/normalizeData"
import { getMusicKitInstance } from "@/lib/musickitMethods"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  view: string;
  setView: (view: string) => void;
  setGlobalPlaylistId: (id: string | null) => void;
  globalPlaylistId: string | null;
  service : 'spotify' | 'apple';
}

export function Sidebar({ className, setView, globalPlaylistId, view, setGlobalPlaylistId }: SidebarProps) {

  const {data:session} = useSession();
  const [x, setX] = React.useState("");
  const [playlists, setPlaylists] = React.useState<SimplifiedPlaylist[]>([])

  let music: MusicKit.MusicKitInstance | null;

  React.useEffect(() => {
    async function fetchData() {
      if (session && session.accessToken) {
        try{
          const items = await fetchPlaylists(session.accessToken, session.user?.id as string);
          const normalizedPlaylists = items.map(playlist => normalizeSimplifiedPlaylistData("spotify", playlist));
          setPlaylists(normalizedPlaylists);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      }
      music = getMusicKitInstance();
      if(music?.isAuthorized){
        const data = await music?.api.library.playlists(null);
        console.log(data);
      }
    }
  
    fetchData();
  }, [session]);


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
                  variant={view==="playlist" && globalPlaylistId ===playlist.id ? "secondary" : "ghost"}
                  className="w-full justify-start font-normal"
                  onClick={()=> {
                    setView("playlist")
                    setGlobalPlaylistId(playlist.id)
                  }}
                >
                  <Icons.playlist/>
                  {playlist.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
