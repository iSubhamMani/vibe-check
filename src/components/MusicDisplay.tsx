"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { setCurrentMusic } from "@/lib/store/slices/musicQueue";
import VideoPlayer from "./VideoPlayer";
import { updateQueueAndCurrentMusic } from "@/lib/actions/updateQueueAndCurrentMusic";

const MusicDisplay = ({ roomCode }: { roomCode: string }) => {
  const { queue, currentMusic } = useAppSelector((state) => state.musicQueue);
  const dispatch = useAppDispatch();

  return (
    <div>
      {queue.length >= 0 && currentMusic && (
        <div className="mb-6">
          <h1 className="font-bold text-2xl text-start pb-4">
            Currently Playing
          </h1>
          <VideoPlayer roomCode={roomCode} />
        </div>
      )}

      {queue.length > 0 && !currentMusic && (
        <div className="mb-6 flex flex-col items-center">
          <h1 className="mb-2 font-bold text-sm xl:text-lg text-center bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 to-purple-600">
            Looks like you haven&apos;t started the party yet
          </h1>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            onClick={async () => {
              dispatch(setCurrentMusic(queue[0]));
              await updateQueueAndCurrentMusic(roomCode, queue[0]);
            }}
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>Start Playing</span>
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
          </HoverBorderGradient>
        </div>
      )}

      {queue.length === 0 && !currentMusic && (
        <div className="mb-6">
          <p className="font-bold text-sm xl:text-lg text-center bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 to-purple-600">
            Queue is empty. Add some music
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicDisplay;
