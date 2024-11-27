import { YoutubeMusic } from "@/lib/interface/YTMusic";
import { createSlice } from "@reduxjs/toolkit";

const musicQueueSlice = createSlice({
  name: "musicQueue",
  initialState: {
    cachedResults: {} as Record<string, YoutubeMusic>,
  },
  reducers: {
    addMusicToCache(state, action) {
      if (!state.cachedResults[action.payload.videoId]) {
        state.cachedResults[action.payload.videoId] = action.payload;
      }
    },
    setMusicCache(state, action) {
      state.cachedResults = action.payload;
    },
    removeMusicFromCache(state, action) {
      delete state.cachedResults[action.payload];
    },
    clearMusicCache(state) {
      state.cachedResults = {};
    },
  },
});

export const {
  addMusicToCache,
  setMusicCache,
  removeMusicFromCache,
  clearMusicCache,
} = musicQueueSlice.actions;
export default musicQueueSlice.reducer;
