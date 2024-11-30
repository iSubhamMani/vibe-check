"use client";

import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { MusicCard } from "./MusicCard";
import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { Music } from "@/lib/interface/Music";
import { useAppDispatch } from "@/lib/store/hook";
import { setMusicQueue } from "@/lib/store/slices/musicQueue";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const MusicQueue = ({ roomCode }: { roomCode: string }) => {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: musics, isFetching } = useQuery({
    queryKey: [`music-queue-${roomCode}`],
    queryFn: async () => {
      const res = await axios.get(`/api/music-queue/${roomCode}`);
      const musics = res.data.data as Music[];
      const musicIds = musics.map((music) => music.musicId);
      dispatch(setMusicQueue(musicIds));
      return musics;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!roomCode) return;

    pusherClient.subscribe(`room-${roomCode}`);

    const handleNewMusic = async () => {
      qc.invalidateQueries(`music-queue-${roomCode}`);
    };

    const handleRoomEnd = async () => {
      toast.info("Room has been closed");
      router.replace("/dashboard");
    };

    pusherClient.bind("update-queue", handleNewMusic);
    pusherClient.bind("end-room", handleRoomEnd);

    return () => {
      pusherClient.unsubscribe(`room-${roomCode}`);
      pusherClient.unbind("update-queue", handleNewMusic);
      pusherClient.unbind("end-room", handleRoomEnd);
    };
  }, [roomCode]);

  return (
    <div className="flex-1 pt-6 px-6 rounded-md bg-white h-full overflow-hidden">
      <h1 className="font-bold text-2xl text-start pb-4 text-indigo-600">
        Up Next
      </h1>
      {isFetching && (
        <div className="flex justify-center my-4">
          <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" />
        </div>
      )}
      <ul
        className="py-1 overflow-y-auto h-full max-h-[500px] lg:max-h-[calc(100vh-100px)]"
        role="listbox"
      >
        {musics?.map((m: Music) => {
          return (
            <MusicCard
              key={m.musicId}
              isVoted={m.isVoted}
              roomCode={roomCode}
              musicId={m.musicId}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MusicQueue;
