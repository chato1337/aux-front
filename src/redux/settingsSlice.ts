import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  language: string;
  modal: boolean
}

const initialState: SettingsState = {
  language: "en",
  modal: false
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLang: (state: SettingsState, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    setModal: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.modal = action.payload
    } 
  },
})

// Action creators are generated for each case reducer function
export const { changeLang, setModal } = settingsSlice.actions

export default settingsSlice.reducer