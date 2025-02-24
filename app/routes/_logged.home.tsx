import { json } from "@remix-run/react";
import { requireUserSession } from "../lib/session.server";
import HomeGrid from "~/components/home-components/home-grid";
import { useEffect, useState } from "react";
import { Playlist } from "~/lib/types";

export const loader = async ({ request }: { request: Request }) => {
  const username = await requireUserSession(request);
  return json({ username });
};

const Home = () => {
  const [trendingMusic, setTrendingMusic] = useState<Playlist[]>([]);

  async function populatePlaylists() {
    const trendingMusic = await fetch(
      "https://saavn.dev/api/search/playlists?query=Trending"
    );

    const trendingData = await trendingMusic.json();
    console.log(trendingData.data.results);
    setTrendingMusic(trendingData.data.results);
  }

  useEffect(() => {
    populatePlaylists();
  }, []);

  return (
    <div className="w-full h-full">
      <HomeGrid trendingMusic={trendingMusic} />
    </div>
  );
};

export default Home;
