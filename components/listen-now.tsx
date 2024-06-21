"use client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { AlbumArtwork } from "./album-artwork";
import { PodcastEmptyPlaceholder } from "./podcast-empty-placeholder";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getCategoryPlaylists, getCategoriesForListenNow } from "@/lib/Spotifymethods";
import {Swiper , SwiperSlide} from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

export interface ListenNowProps {
    setGlobalPlaylistId: (id: string | null) => void;
    setView: (view: string) => void;
}


export default function ListenNow(props: ListenNowProps) {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<SpotifyCategory[]>([]);
  const [playlistsByCategory, setPlaylistsByCategory] = useState<{[key: string]: SpotifyPlaylist[]}>({});

  useEffect(() => {
    async function fetchCategoriesAndPlaylists() {
      if (session?.accessToken) {
        try {
          const categories = await getCategoriesForListenNow(session.accessToken);
          setCategories(categories);
          categories.forEach(category => {
            fetchPlaylists(category.id, session.accessToken as string);
          });
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    }

    async function fetchPlaylists(categoryId: string, accessToken: string) {
      try {
        const playlists = await getCategoryPlaylists(accessToken, categoryId);
        setPlaylistsByCategory(prev => ({
          ...prev,
          [categoryId]: playlists
        }));
      } catch (error) {
        console.error(`Error fetching playlists for category ${categoryId}:`, error);
      }
    }

    fetchCategoriesAndPlaylists();
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
              <Button onClick={() => signIn('spotify', {callbackUrl: "/"})}>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Add music
              </Button>
            </div>
          </div>
          <TabsContent value="music" className="border-none p-0 outline-none overflow-auto">
            {categories.map(category => (
              <React.Fragment key={category.id}>
                <div className="mt-6 space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {category.name}
                  </h2>
                </div>
                <Separator className="my-4" />
                <div className="relative">
                  <Swiper 
                    modules={[Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    freeMode={true}
                    speed={100}
                    scrollbar={{ draggable: true, hide: true}}
                    className="mySwiper"
                    >
                      {playlistsByCategory[category.id]?.map(playlist => (
                        <SwiperSlide key={playlist.id} style={{ width: '250px'}} onClick={()=> {props.setGlobalPlaylistId(playlist.id); props.setView('playlist')}}>
                            <AlbumArtwork
                            key={playlist.id}
                            playlist={playlist}
                            className="w-[250px] mb-5"
                            height={330}
                            width={250}
                            aspectRatio="square"
                            />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </React.Fragment>
            ))}
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
