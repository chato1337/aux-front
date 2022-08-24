import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FORM_OPTION {
	'create',
	'edit',
	'delete',
	'pay',
	'join'
}

export interface SettingsState {
	language: string;
	modal: boolean;
	actionForm: FORM_OPTION;
	searchQuery: string | null;
	limit: number;
	offset: number;
	count: number;
	order: string;
}

export const initialLimit = 10

const initialState: SettingsState = {
	language: 'en',
	modal: false,
	actionForm: FORM_OPTION.create,
	searchQuery: null,
	limit: initialLimit,
	offset: 0,
	count: 0,
	order: 'id',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		changeLang: (state: SettingsState, action: PayloadAction<string>) => {
			state.language = action.payload;
		},
		setModal: (state: SettingsState, action: PayloadAction<boolean>) => {
			state.modal = action.payload;
		},
		setActionForm: (
			state: SettingsState,
			action: PayloadAction<FORM_OPTION>
		) => {
			state.actionForm = action.payload;
		},
		setSearchQuery: (
			state: SettingsState,
			action: PayloadAction<string | null>
		) => {
			state.searchQuery = action.payload;
		},
		setLimit: (state: SettingsState, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		setOffset: (state: SettingsState, action: PayloadAction<number>) => {
			state.offset = action.payload;
		},
		setCount: (state: SettingsState, action: PayloadAction<number>) => {
			state.count = action.payload;
		},
		setOrder: (state: SettingsState, action: PayloadAction<string>) => {
			state.order = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	changeLang,
	setModal,
	setActionForm,
	setSearchQuery,
	setLimit,
	setOffset,
	setCount,
	setOrder,
} = settingsSlice.actions;

export default settingsSlice.reducer;
