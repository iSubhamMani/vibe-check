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
          <h1 className="font-bold text-xl text-balance text-center pb-4 bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 to-purple-600">
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
          </HoverBorderGradient>
        </div>
      )}

      {queue.length === 0 && !currentMusic && (
        <div className="mb-6">
          <p className="font-bold text-xl text-center bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 to-purple-600">
            Queue is empty. Add a music to the queue
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicDisplay;
