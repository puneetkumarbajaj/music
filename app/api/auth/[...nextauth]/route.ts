import SpotifyProvider from "next-auth/providers/spotify";
import NextAuth from "next-auth/next";
import fetch from "node-fetch";

const scopes = [
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "user-read-recently-played",
    "user-follow-read",
    "user-follow-modify",
    "user-read-playback-position",
    "playlist-read-collaborative",
].join(" ");

const query = new URLSearchParams({scope: scopes})

const LOGIN_URL = `https://accounts.spotify.com/authorize?${query.toString()}`

async function refreshAccessToken(token: any) {
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method : "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
            client_id: process.env.SPOTIFY_CLIENT_ID?.toString() || "",
        }),
    }
    const body = await fetch(url, payload);
    const response = await body.json() as any;

    if(!body.ok) {
        console.error("Failed to refresh access token", response);
        return;
    }

    return {
        ...token,
        accessToken: response.access_token,
        accessTokenExpires: Date.now() + response.expires_in * 1000,
        refreshToken: response.refresh_token || token.refreshToken,
    }
}

const handler = NextAuth({
    providers: [
    SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID || "",
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
        authorization: LOGIN_URL || "",

    }),
    ],
    pages: {
        signIn: "http://localhost:3000/",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    
    callbacks: {
        async jwt({token, user, account}){
            if(account && user) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.accessTokenExpires = account.expires_at as number;
                token.id = user.id;
                return token;
            }

            console.log("jwt", token);

            //access token has not expired
            if(Date.now() < (token.accessTokenExpires as number)* 1000) {
                return token;
            }


            //access token has expired
            return refreshAccessToken(token);
        },

        async session({session, token, user}) {
            // send properties to the client, like an access_token from the token
            session.accessToken = token.accessToken as string;
            session.user = {id: token.id as string, name: token.name as string, email: token.email as string, image: token.picture as string};
            return session;
        }
    },
});

export {handler as GET, handler as POST};