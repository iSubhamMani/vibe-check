"use client";
import { addMusicToQueue } from "@/lib/actions/addMusicToQueue";
import { YoutubeMusic } from "@/lib/interface/YTMusic";
import Image from "next/image";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const MusicSearchCard = ({
  music,
  roomCode,
}: {
  music: YoutubeMusic;
  roomCode: string;
}) => {
  const qc = useQueryClient();

  return (
    <li
      onClick={async () => {
        const res = await addMusicToQueue(music.videoId, roomCode);

        if (res.success) {
          qc.invalidateQueries(`music-queue-${roomCode}`);
        } else {
          toast.error(res.error);
        }
      }}
      key={music.videoId}
      className="rounded-md px-2 py-2 cursor-pointer hover:bg-indigo-50 hover:scale-95 transition-all duration-200 ease-in-out"
    >
      <div className="flex items-start gap-3">
        <Image
          src={music.thumbnails[1].url || music.thumbnails[0].url || ""}
          alt={`${music.name} thumbnail`}
          className="w-10 h-10 rounded-md object-cover shadow-md"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="line-clamp-2 font-medium text-sm">{music.name}</span>
          <span className="text-xs text-gray-500">{music.artist.name}</span>
        </div>
      </div>
    </li>
  );
};
