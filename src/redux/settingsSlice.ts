import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  language: string;
  modal: boolean;
  actionForm: "create" | "edit" | "delete",
  searchQuery: string | null
}

const initialState: SettingsState = {
  language: "en",
  modal: false,
  actionForm: "create",
  searchQuery: null
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
    },
    setActionForm: (state: SettingsState, action: PayloadAction<"create" | "edit" | "delete">) => {
      state.actionForm = action.payload
    },
    setSearchQuery: (state: SettingsState, action: PayloadAction<string | null>) => {
      state.searchQuery = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeLang, setModal, setActionForm, setSearchQuery } = settingsSlice.actions

export default settingsSlice.reducer