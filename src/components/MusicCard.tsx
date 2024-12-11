import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import MusicCardShimmer from "./MusicCardShimmer";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { addMusicToCache } from "@/lib/store/slices/musicQueue";
import { toast } from "react-toastify";
import { voteMusic } from "@/lib/actions/voteMusic";

export const MusicCard = ({
  musicId,
  roomCode,
  isVoted,
}: {
  musicId: string;
  roomCode: string;
  isVoted: boolean;
}) => {
  const { cachedResults } = useAppSelector((state) => state.musicQueue);
  const music = cachedResults[musicId];
  const dispatch = useAppDispatch();

  useEffect(() => {
    // check if music already exists in state
    if (!musicId || music) return;
    async function getMusicInfo() {
      try {
        const res = await axios.get(`/api/search-yt/${musicId}`);
        dispatch(addMusicToCache(res.data.data));
      } catch {
        toast.error("Error getting music info");
      }
    }
    getMusicInfo();
  }, [musicId, music, dispatch]);

  if (!music?.videoId) return <MusicCardShimmer />;

  return (
    <li
      key={music.videoId}
      className="flex justify-between items-start gap-4 px-2 my-2 mr-2 rounded-md transition-all duration-200 ease-in-out"
    >
      <div className="flex flex-1 items-start gap-3">
        <Image
          src={music.thumbnails[0].url}
          alt={`${music.name} thumbnail`}
          className="w-[80px] h-[80px] rounded-md object-cover shadow-md"
          width={80}
          height={80}
        />
        <div className="flex flex-col">
          <span className="line-clamp-2 font-medium text-sm md:text-base text-black">
            {music.name}
          </span>
          <span className="text-xs md:text-sm text-slate-600 line-clamp-1">
            {music.artist.name}
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={async () => {
            try {
              await voteMusic(musicId, roomCode);
            } catch {
              toast.error("Error voting music");
            }
          }}
          className={`hover:bg-purple-100 ${
            isVoted ? "bg-purple-100" : ""
          } rounded-full p-1`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={`${isVoted ? "#9333ea" : "gray"}`}
            className="size-5 md:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};
