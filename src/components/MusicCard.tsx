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
    // check if music already exists in state
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
      className="flex justify-between items-start gap-4 px-2 py-2 my-2 mr-2 rounded-md transition-all duration-200 ease-in-out"
    >
      <div className="flex flex-1 items-start gap-3">
        <Image
          src={music?.thumbnails[1 || 0]?.url ?? ""}
          alt={`${music.name} thumbnail`}
          className="w-[80px] h-[80px] rounded-md object-cover shadow-md"
          width={80}
          height={80}
        />
        <div className="flex flex-col">
          <span className="line-clamp-2 font-medium text-base text-black">
            {music.name}
          </span>
          <span className="text-sm text-slate-600 line-clamp-1">
            {music.artist.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <button className="hover:bg-indigo-100 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button className="hover:bg-indigo-100 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};
