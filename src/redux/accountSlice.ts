import { Staff } from "../models/User.model";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from '../models/Organization.model.d';


export interface AccountState {
    staff: Staff | null,
    organization: Organization | null,
    token: string | null,
}

const initialState: AccountState = {
    staff: null,
    organization: null,
    token: null,
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setStaff: (state: AccountState, action: PayloadAction<Staff | null>) => {
            state.staff = action.payload
        },
        setOrganization: (state: AccountState, action: PayloadAction<Organization | null>) => {
            state.organization = action.payload
        },
        setToken: (state: AccountState, action: PayloadAction<string | null>) => {
            state.token = action.payload
        }
    }
})

export const { setStaff, setOrganization, setToken } = accountSlice.actions

export default accountSlice.reducer
