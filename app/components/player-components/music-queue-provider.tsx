import { createContext, useContext, useState, ReactNode } from "react";
import { Song } from "../../lib/types";

interface MusicQueueContextType {
  queue: Song[];
  currentSong: Song | null;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  playNext: () => void;
  playPrevious: () => void;
  clearQueue: () => void;
}

const MusicQueueContext = createContext<MusicQueueContextType | undefined>(
  undefined
);

export const MusicQueueProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const addToQueue = (song: Song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
    if (currentIndex === -1) setCurrentIndex(0); // Start playing if nothing is playing
  };

  const removeFromQueue = (songId: string) => {
    setQueue((prevQueue) => prevQueue.filter((song) => song.id !== songId));
  };

  const playNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < queue.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const playPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrentIndex(-1);
  };

  return (
    <MusicQueueContext.Provider
      value={{
        queue,
        currentSong: queue[currentIndex] || null,
        addToQueue,
        removeFromQueue,
        playNext,
        playPrevious,
        clearQueue,
      }}
    >
      {children}
    </MusicQueueContext.Provider>
  );
};

export const useMusicQueue = () => {
  const context = useContext(MusicQueueContext);
  if (!context) {
    throw new Error("useMusicQueue must be used within a MusicQueueProvider");
  }
  return context;
};
