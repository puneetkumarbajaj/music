import { Metadata } from "next"
import Image from "next/image"
import { Menu } from "./menu"
import { Sidebar } from "./sidebar"
import { playlists } from "@/data/playlists"
import ListenNow from "./listen-now"

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export default function MusicPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <ListenNow />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
