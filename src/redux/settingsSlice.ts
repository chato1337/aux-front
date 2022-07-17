import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resources } from '../i18n';

export interface SettingsState {
  language: string;
  translations: any
}

const initialState: SettingsState = {
  language: "en",
  translations: {...resources}
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLang: (state: any, action: PayloadAction<string>) => {
      state.language = action.payload
    },
  },
})

export const currentLang = (state: SettingsState) => {
  return state.translations[state.language]
}

// Action creators are generated for each case reducer function
export const { changeLang } = settingsSlice.actions

export default settingsSlice.reducer