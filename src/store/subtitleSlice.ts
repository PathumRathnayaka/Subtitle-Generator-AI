// store/subtitleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TranslationRow {
  id: number;
  from: string;
  to: string;
  originalText: string;
  translatedText: string;
}

interface SubtitleState {
  subtitles: TranslationRow[];
  primarySubtitles: TranslationRow[];
  secondarySubtitles: TranslationRow[];
  translatedSubtitles: TranslationRow[]; // Add translatedSubtitles
}

const initialState: SubtitleState = {
  subtitles: [],
  primarySubtitles: [],
  secondarySubtitles: [],
  translatedSubtitles: [], // Initialize translatedSubtitles
};

export const subtitleSlice = createSlice({
  name: 'subtitles',
  initialState,
  reducers: {
    setSubtitles: (state, action: PayloadAction<TranslationRow[]>) => {
      state.subtitles = action.payload;
    },
    setPrimarySubtitles: (state, action: PayloadAction<TranslationRow[]>) => {
      state.primarySubtitles = action.payload;
    },
    setSecondarySubtitles: (state, action: PayloadAction<TranslationRow[]>) => {
      state.secondarySubtitles = action.payload;
    },
    setTranslatedSubtitles: (state, action: PayloadAction<TranslationRow[]>) => {
      state.translatedSubtitles = action.payload; // Add setTranslatedSubtitles
    },
    updateSubtitle: (state, action: PayloadAction<{ id: number; field: keyof TranslationRow; value: string }>) => {
      const { id, field, value } = action.payload;
      const subtitle = state.subtitles.find(s => s.id === id);
      if (subtitle) {
        subtitle[field] = value;
      }
    },
    convertSubtitles: (state) => {
      state.subtitles = state.subtitles.map(subtitle => ({
        ...subtitle,
        translatedText: ` ${subtitle.originalText}`,
      }));
    },
    syncSubtitles: (state) => {
      state.subtitles = state.primarySubtitles.map((primary, index) => ({
        ...primary,
        translatedText: state.secondarySubtitles[index]?.originalText || '',
      }));
    },
  },
});

export const {
  setSubtitles,
  setPrimarySubtitles,
  setSecondarySubtitles,
  setTranslatedSubtitles, // Export setTranslatedSubtitles
  updateSubtitle,
  convertSubtitles,
  syncSubtitles
} = subtitleSlice.actions;
export default subtitleSlice.reducer;