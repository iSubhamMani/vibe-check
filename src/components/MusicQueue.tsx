"use client";

import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { MusicCard } from "./MusicCard";
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { Music } from "@/lib/interface/Music";

const MusicQueue = ({ roomCode }: { roomCode: string }) => {
  const qc = useQueryClient();

  const { data: musics, isLoading } = useQuery({
    queryKey: [`music-queue-${roomCode}`],
    queryFn: async () => {
      const res = await axios.get(`/api/music-queue/${roomCode}`);
      return res.data.data;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!roomCode) return;

    pusherClient.subscribe(`room-${roomCode}`);

    const handleNewMusic = async () => {
      qc.invalidateQueries(`music-queue-${roomCode}`);
    };

    pusherClient.bind("update-queue", handleNewMusic);

    return () => {
      pusherClient.unsubscribe(`room-${roomCode}`);
      pusherClient.unbind("update-queue", handleNewMusic);
    };
  }, [roomCode]);

  return (
    <div className="flex-1 pt-6 px-6 rounded-md bg-white h-full overflow-hidden">
      <h1 className="font-bold text-2xl text-start pb-4">Up Next</h1>
      {isLoading && (
        <div className="flex justify-center my-4">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <ul
        className="py-1 overflow-y-auto h-full max-h-[500px] lg:max-h-[calc(100vh-100px)]"
        role="listbox"
      >
        {musics?.map((m: Music) => {
          return <MusicCard key={m.musicId} musicId={m.musicId} />;
        })}
      </ul>
    </div>
  );
};

export default MusicQueue;
