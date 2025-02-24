import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useMusicQueue } from "./music-queue-provider";
import { Button } from "../ui/button";
import { Song } from "../../lib/types";
import { Delete } from "lucide-react";

function Queue() {
  const { queue, removeFromQueue } = useMusicQueue();
  const [localQueue, setLocalQueue] = useState(queue);

  const handleRemove = (id: string) => {
    const updatedQueue = localQueue.filter((song) => song.id !== id);
    setLocalQueue(updatedQueue);
    removeFromQueue(id);
  };

  return (
    <div className="bg-background">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Artists</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localQueue.map((item: Song) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full"
                    src={item.image[2].url}
                    width={40}
                    height={40}
                    alt={item.name}
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {item.artists.primary.map((artist) => artist.name).join(", ")}
              </TableCell>
              <TableCell>
                <Button
                  variant={"secondary"}
                  onClick={() => handleRemove(item.id)}
                  className="w-full"
                >
                  <Delete className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Table with images
      </p>
    </div>
  );
}

export { Queue };
