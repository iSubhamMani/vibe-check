import { YoutubeMusic } from "@/lib/interface/YTMusic";
import { createSlice } from "@reduxjs/toolkit";

const musicCachedResultsSlice = createSlice({
  name: "musicCachedResults",
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
} = musicCachedResultsSlice.actions;
export default musicCachedResultsSlice.reducer;
