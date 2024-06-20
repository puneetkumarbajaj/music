/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
        domains: ['daylist.spotifycdn.com', 'via.placeholder.com', 'i.scdn.co', 'thisis-images.spotifycdn.com', 'newjams-images.scdn.co', 'daily-mix.scdn.co', 'blend-playlist-covers.spotifycdn.com' , 'seed-mix-image.spotifycdn.com'],
    }
};

export default nextConfig;
