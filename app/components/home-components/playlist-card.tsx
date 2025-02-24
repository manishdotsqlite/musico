import { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Playlist, Song } from "../../lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useMusicQueue } from "../player-components/music-queue-provider";

const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  const { addToQueue, clearQueue } = useMusicQueue();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);

  //obtain the playlist songs
  async function getPlaylistSongs() {
    const playlistSongs = await fetch(
      `https://saavn.dev/api/playlists?id=${playlist.id}`
    );

    const playlistData = await playlistSongs.json();
    setPlaylistSongs(playlistData.data.songs);
  }

  async function handlePlay() {
    // fetch the corresponding playlist songs
    await getPlaylistSongs();

    // add the songs to the queue
    clearQueue();
    playlistSongs.forEach((song) => addToQueue(song));
  }

  const playlistPictureDetails = playlist.image[2];
  const playlistPicture = playlistPictureDetails.url;
  const playlistName = playlist.name;
  const playlistSongCount = playlist.songCount;

  return (
    <div className="group relative">
      <div className="relative aspect-square mb-3">
        <img
          src={playlistPicture}
          alt={playlistName}
          width={300}
          height={300}
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
          <button
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
            onClick={handlePlay}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Pause className="w-7 h-7" fill="black" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Play className="w-7 h-7" fill="black" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
      <h3 className="font-medium text-lg truncate">{playlistName} </h3>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{playlistSongCount} songs</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
