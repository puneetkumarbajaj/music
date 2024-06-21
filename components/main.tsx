"use client";
import { Sidebar } from "./sidebar"
import ListenNow from "./listen-now"
import React from "react"
import { PlaylistView } from "./PlaylistView";

export default function MusicPage() {

  const [view, setView] = React.useState("listen-now");
  const [globalPlaylistId, setGlobalPlaylistId] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activeSong, setActiveSong] = React.useState<string | null>(null);
  const [service, setService] = React.useState<"spotify" | "apple">("apple");

  return (
    <>
      <div className="md:hidden">
        <div className="flex items-center justify-center h-dvh text-balance text-center">
          We are still working on the mobile version please continue using the desktop version for now.<br/> Thank you for your patience
        </div>
      </div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="sticky top-0 flex-1">
              <Sidebar
                view={view}
                setView={setView} 
                className="hidden lg:block sticky top-10 overflow-auto" 
                setGlobalPlaylistId={setGlobalPlaylistId}
                globalPlaylistId = {globalPlaylistId}
                service={service}
              />
              </div>
              <div className="col-span-4 overflow-auto">
                {view === "listen-now" && <ListenNow setGlobalPlaylistId={setGlobalPlaylistId} setView = {setView} service={service} />}
                {view === "playlist" && <PlaylistView globalPlaylistId={globalPlaylistId} service={service} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
