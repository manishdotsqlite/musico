import { Playlist } from "~/lib/types";
import PlaylistCard from "./playlist-card";

export default function HomePage({
  trendingMusic,
}: {
  trendingMusic: Playlist[];
}) {
  return (
    <div className=" bg-white text-black flex items-center justify-center">
      <main className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="">
          <h1 className="text-5xl font-bold mb-3">Your Music</h1>
          <div className="h-1 w-20 bg-white" />
        </div>

        {/* Trending Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Trending Now
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trendingMusic.map((playlist, index) => (
              <PlaylistCard key={index} playlist={playlist} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
