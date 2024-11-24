import { YoutubeMusic } from "@/lib/interface/YTMusic";
import { createSlice } from "@reduxjs/toolkit";

const musicQueueSlice = createSlice({
  name: "music-queue",
  initialState: {
    queue: {} as Record<string, YoutubeMusic>,
  },
  reducers: {
    addMusicToQueue(state, action) {
      if (!state.queue[action.payload.videoId]) {
        state.queue[action.payload.videoId] = action.payload;
      }
    },
    removeMusicFromQueue(state, action) {
      delete state.queue[action.payload];
    },
    clearMusicQueue(state) {
      state.queue = {};
    },
  },
});

export const { addMusicToQueue, removeMusicFromQueue, clearMusicQueue } =
  musicQueueSlice.actions;
export default musicQueueSlice.reducer;
