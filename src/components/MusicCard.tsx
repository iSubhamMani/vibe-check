import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import MusicCardShimmer from "./MusicCardShimmer";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { addMusicToQueue } from "@/lib/store/slices/musicQueue";

export const MusicCard = ({ musicId }: { musicId: string }) => {
  const { queue } = useAppSelector((state) => state.musicQueue);
  const music = queue[musicId];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!musicId || music) return;
    async function getMusicInfo() {
      console.log("getting music info: ", musicId);
      const res = await axios.get(`/api/search-yt/${musicId}`);
      dispatch(addMusicToQueue(res.data.data));
    }
    getMusicInfo();
  }, [musicId, music, dispatch]);

  if (!music?.videoId) return <MusicCardShimmer />;

  return (
    <li
      key={music.videoId}
      className="px-2 py-2 my-2 mr-2 rounded-md transition-all duration-200 ease-in-out"
    >
      <div className="flex items-start gap-3">
        <Image
          src={music?.thumbnails[1 || 0]?.url ?? ""}
          alt={`${music.name} thumbnail`}
          className="w-[80px] sm:w-[100px] md:w-[120px] h-[80px] rounded-md object-cover shadow-md"
          width={120}
          height={80}
        />
        <div className="flex flex-col">
          <span className="line-clamp-2 font-medium text-base text-black">
            {music.name}
          </span>
          <span className="text-sm text-slate-600">{music.artist.name}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 md:size-6"
          >
            <polygon points="12 3 4 12 8 12 8 20 16 20 16 12 20 12 12 3" />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 md:size-6 rotate-180"
          >
            <polygon points="12 3 4 12 8 12 8 20 16 20 16 12 20 12 12 3" />
          </svg>
        </button>
      </div>
    </li>
  );
};
