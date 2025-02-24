import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  ListMusic,
  MoreHorizontal,
} from "lucide-react";
import { Slider } from "../ui/slider";
import { useMusicQueue } from "./music-queue-provider";
import { toast } from "sonner";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogTitle } from "../ui/dialog";
import { Queue } from "./queue";
import { Button } from "../ui/button";

export default function AudioPlayer() {
  const { queue, currentSong, playNext, playPrevious } = useMusicQueue();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    console.log("Current Song:", currentSong);
    console.log("Music Queue:", queue);
  }, [currentSong, queue]);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      console.log("Current Song URL:", currentSong.url);

      if (currentSong.url) {
        // Try setting the audio source
        audioRef.current.src = currentSong.downloadUrl[4].url;

        // Attempt to play the song
        audioRef.current
          .play()
          .then(() => {
            toast.success("Now playing: " + currentSong.name); // Success message
          })
          .catch((error) => {
            toast.error(
              "Failed to load the song. Unsupported format or issue with the source."
            ); // Error message
            console.error("Audio playback error:", error);
          });

        setIsPlaying(true);
      } else {
        toast.error("No valid audio URL found for this song."); // Error message if URL is missing
      }
    }
  }, [currentSong]);

  // Update time when playing
  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const audioElement = audioRef.current;
    audioElement?.addEventListener("timeupdate", updateTime);
    return () => audioElement?.removeEventListener("timeupdate", updateTime);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100; // Set the volume of the audio element
      setVolume(value); // Update volume state
    }
  };

  const handleNext = () => {
    playNext();
  };

  const handlePrevious = () => {
    playPrevious();
  };

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 w-full border-t border-gray-400">
        <div className="bg-white p-4 text-center text-gray-500">
          <p>No song playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 w-full max-w-6xl">
      <div className="bg-white rounded-xl shadow-2xl p-4">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-xl overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{
              width: `${(currentTime / currentSong.duration) * 100}%`,
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={currentSong.image[2].url}
              alt="Album Cover"
              className="object-cover"
            />
          </div>

          {/* Track Info */}
          <div className="flex-grow min-w-0">
            <h3 className="font-medium truncate">{currentSong.name}</h3>
            <p className="text-sm text-gray-500 truncate">
              {currentSong.artists.primary
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-black transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button
              className="text-gray-400 hover:text-black transition-colors"
              onClick={handlePrevious}
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
            <button
              className="text-gray-400 hover:text-black transition-colors"
              onClick={handleNext}
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-black transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>

          {/* Time and Volume */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-16"
              onChange={(event) =>
                handleVolume(Number((event.target as HTMLInputElement).value))
              }
            />
          </div>

          {/* Additional Controls */}
        </div>
      </div>
      <audio ref={audioRef} autoPlay>
        <track kind="captions" />
      </audio>
    </div>
  );
}
