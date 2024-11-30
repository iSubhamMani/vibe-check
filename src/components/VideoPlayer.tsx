/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateQueueAndCurrentMusic } from "@/lib/actions/updateQueueAndCurrentMusic";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { setCurrentMusic } from "@/lib/store/slices/musicQueue";
import { useEffect, useRef } from "react";

// Declare the YT property on the window object
declare global {
  interface Window {
    YT: any;
  }
}

const VideoPlayer = ({ roomCode }: { roomCode: string }) => {
  const playerRef = useRef<any>(null); // Reference to the YouTube player
  const { currentMusic, queue } = useAppSelector((state) => state.musicQueue);
  const queueRef = useRef(queue); // Track the latest queue
  const dispatch = useAppDispatch();

  // Load the YouTube IFrame API script
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => initializePlayer();
    } else {
      initializePlayer();
    }
  }, []);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  // Initialize the YouTube Player
  const initializePlayer = () => {
    if (!currentMusic) return;

    window.YT.ready(() => {
      playerRef.current = new window.YT.Player("player", {
        height: "240",
        width: "",
        videoId: currentMusic,
        playerVars: {
          autoplay: 1, // Enable autoplay,
          fs: 0,
          rel: 0,
        },
        events: {
          onStateChange: handlePlayerStateChange,
        },
      });
    });
  };

  const handlePlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      playNextVideo();
    }
  };

  const playNextVideo = () => {
    if (!playerRef.current) return;

    const queue = queueRef.current;

    if (queue && queue.length > 0) {
      dispatch(setCurrentMusic(queue[0]));
      playerRef.current.loadVideoById(queue[0]);
    } else {
      dispatch(setCurrentMusic(null));
    }

    if (queue.length === 0) {
      updateQueue(roomCode, "");
      return;
    }
    updateQueue(roomCode, queue[0]);
  };

  async function updateQueue(roomCode: string, nextMusic: string) {
    await updateQueueAndCurrentMusic(roomCode, nextMusic);
  }

  return (
    <div className="w-full rounded-md shadow-xl overflow-hidden">
      <div className="w-full" id="player"></div>
    </div>
  );
};

export default VideoPlayer;
