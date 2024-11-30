"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import MusicCardShimmer from "./MusicCardShimmer";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
  addMusicToCache,
  setCurrentMusic,
} from "@/lib/store/slices/musicQueue";
import { updateCurrentMusic } from "@/lib/actions/updateCurrentMusic";

const ContinuePlaying = ({
  musicId,
  roomCode,
}: {
  musicId: string;
  roomCode: string;
}) => {
  const { cachedResults, currentMusic } = useAppSelector(
    (state) => state.musicQueue
  );
  const music = cachedResults[musicId];
  const dispatch = useAppDispatch();

  useEffect(() => {
    // check if music already exists in state
    if (!musicId || music) return;
    async function getMusicInfo() {
      try {
        const res = await axios.get(`/api/search-yt/${musicId}`);
        dispatch(addMusicToCache(res.data.data));
      } catch {}
    }
    getMusicInfo();
  }, [musicId, music, dispatch]);

  if (!music?.videoId) return <MusicCardShimmer />;

  return (
    !currentMusic && (
      <div className="p-4 my-2 shadow-sm rounded-md bg-purple-100">
        <p className="text-sm md:text-base font-bold text-purple-600">
          Continue Playing?
        </p>
        <div className="mt-4 flex justify-between items-start gap-4 rounded-md transition-all duration-200 ease-in-out">
          <div className="flex flex-1 items-start gap-3">
            <Image
              src={music?.thumbnails[1 || 0]?.url ?? ""}
              alt={`${music.name} thumbnail`}
              className="w-[60px] h-[60px] rounded-md object-cover shadow-md"
              width={60}
              height={60}
            />
            <div className="flex flex-col">
              <span className="line-clamp-2 font-medium text-sm text-black">
                {music.name}
              </span>
              <span className="text-xs text-slate-600 line-clamp-1">
                {music.artist.name}
              </span>
            </div>
          </div>
          <div>
            <button
              onClick={async () => {
                dispatch(setCurrentMusic(musicId));
                try {
                  await updateCurrentMusic(roomCode);
                } catch {
                  console.log("Error updating current music");
                }
              }}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md px-3 md:px-4 py-2 text-xs md:text-sm text-white flex gap-2 items-center"
            >
              Play
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 md:size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ContinuePlaying;
