"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { YoutubeMusic } from "@/lib/interface/YTMusic";
import { MusicSearchCard } from "./MusicSearchCard";
import MusicSearchCardShimmer from "./MusicSearchCardShimmer";
import { toast } from "react-toastify";

const MusicSearch = ({ roomCode }: { roomCode: string }) => {
  const [search, setSearch] = useState("");
  const [musics, setMusics] = useState<YoutubeMusic[]>([]);
  const [resultsCardActive, setResultsCardActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!search.trim()) {
      setResultsCardActive(false);
      setLoading(false);
      return;
    }

    setResultsCardActive(true);
    setLoading(true);

    async function fetchMusics() {
      try {
        const musics = await axios.get(`/api/search-yt?query=${search}`);
        setMusics(musics.data.data);
      } catch {
        toast.error("Error fetching musics");
      } finally {
        setLoading(false);
      }
    }

    const t = setTimeout(() => {
      fetchMusics();
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="relative">
      <div className="rounded-full px-4 flex items-center gap-2 border focus:border-indigo-600 border-indigo-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a music"
          className="w-full h-full py-3 relative text-sm sm:text-base z-30 transition duration-300 ease-in-out  dark:text-white bg-transparent text-black focus:outline-none focus:ring-0"
        />
      </div>

      {resultsCardActive && (
        <div className="border absolute z-10 w-full bg-white/70 rounded-md mt-2 shadow-lg backdrop-blur-md">
          <div className="flex justify-between items-center">
            <span className="pl-4 text-xs font-medium">
              Click on a music to add it to queue
            </span>
            <button
              className="m-2 p-1"
              onClick={() => setResultsCardActive(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {loading && (
            <div className="px-2">
              <MusicSearchCardShimmer />
              <MusicSearchCardShimmer />
              <MusicSearchCardShimmer />
            </div>
          )}

          {!loading && (
            <ul
              className="py-1 overflow-auto max-h-[400px] lg:max-h-[260px] px-2"
              role="listbox"
            >
              {musics.map((music) => (
                <MusicSearchCard
                  roomCode={roomCode}
                  key={music.videoId}
                  music={music}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicSearch;
