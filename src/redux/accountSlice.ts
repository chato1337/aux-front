import { Staff } from "../models/User.model";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from '../models/Organization.model.d';


export interface AccountState {
    logged: Staff | null,
    organization: Organization | null,
    token: string | null,
	staffSelected: Staff | null
}

const initialState: AccountState = {
    logged: null,
    organization: null,
    token: null,
	staffSelected: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setLogged: (state: AccountState, action: PayloadAction<Staff | null>) => {
            state.logged = action.payload
        },
        setOrganization: (state: AccountState, action: PayloadAction<Organization | null>) => {
            state.organization = action.payload
        },
        setToken: (state: AccountState, action: PayloadAction<string | null>) => {
            state.token = action.payload
        },
		setStaffSelected: (state: AccountState, action: PayloadAction<Staff | null>) => {
			state.staffSelected = action.payload
		}
    }
})

export const { setLogged, setOrganization, setToken, setStaffSelected } = accountSlice.actions

export default accountSlice.reducer
