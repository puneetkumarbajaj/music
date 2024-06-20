"use client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AlbumArtwork } from "./album-artwork";
import { PodcastEmptyPlaceholder } from "./podcast-empty-placeholder";
import { listenNowAlbums, madeForYouAlbums } from "@/data/albums";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { getFeaturedPlaylists } from "@/lib/Spotifymethods";
import { playlists } from '../data/playlists';

export default function ListenNow() {


const {data:session} = useSession();
  const [x, setX] = React.useState("");
  const [Spotifyplaylists, setSpotifyPlaylists] = React.useState<Playlist[]>([])

  React.useEffect(() => {
    async function fetchData() {
      if (session && session.accessToken) {
        try{
          const items = await getFeaturedPlaylists(session.accessToken);
          setSpotifyPlaylists(items);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      }
    }
  
    fetchData();
    console.log(Spotifyplaylists);
  }, [session]);

  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l overflow-auto">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="music" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="music" className="relative">
                Music
              </TabsTrigger>
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              <TabsTrigger value="live" disabled>
                Live
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <Button onClick={()=>signIn('spotify', {callbackUrl: "/"})}>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Add music
              </Button>
            </div>
          </div>
          <TabsContent value="music" className="border-none p-0 outline-none overflow-auto">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Listen Now
                </h2>
                <p className="text-sm text-muted-foreground">
                  Top picks for you. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {Spotifyplaylists?.map((playlist) => (
                    <AlbumArtwork
                      key={playlist.id}
                      playlist={playlist}
                      className="w-[250px]"
                      aspectRatio="portrait"
                      width={250}
                      height={330}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Made for You
              </h2>
              <p className="text-sm text-muted-foreground">
                Your personal playlists. Updated daily.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {Spotifyplaylists.map((playlist) => (
                    <AlbumArtwork
                      key={playlist.name}
                      playlist={playlist}
                      className="w-[150px]"
                      aspectRatio="square"
                      width={150}
                      height={150}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent
            value="podcasts"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Episodes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your favorite podcasts. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <PodcastEmptyPlaceholder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
