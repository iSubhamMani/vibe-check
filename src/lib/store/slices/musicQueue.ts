import { YoutubeMusic } from "@/lib/interface/YTMusic";
import { createSlice } from "@reduxjs/toolkit";

const musicQueueSlice = createSlice({
  name: "musicQueue",
  initialState: {
    cachedResults: {} as Record<string, YoutubeMusic>,
    queue: [] as string[],
    currentMusic: null as string | null,
  },
  reducers: {
    addMusicToCache(state, action) {
      if (!state.cachedResults[action.payload.videoId]) {
        state.cachedResults[action.payload.videoId] = action.payload;
      }
    },
    setMusicQueue(state, action) {
      state.queue = action.payload;
    },
    removeMusicFromCache(state, action) {
      delete state.cachedResults[action.payload];
    },
    clearMusicCache(state) {
      state.cachedResults = {};
    },
    setCurrentMusic(state, action) {
      state.currentMusic = action.payload;
    },
    clearCurrentMusic(state) {
      state.currentMusic = null;
    },
  },
});

export const {
  addMusicToCache,
  removeMusicFromCache,
  clearMusicCache,
  setMusicQueue,
  setCurrentMusic,
  clearCurrentMusic,
} = musicQueueSlice.actions;
export default musicQueueSlice.reducer;
