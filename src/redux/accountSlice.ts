import { User } from "../models/User.model";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface AccountState {
    user: User | null,
    organization: any,
    token: string | null
}

const initialState: AccountState = {
    user: null,
    organization: null,
    token: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUser: (state: AccountState, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        setOrganization: (state: AccountState, action: any) => {
            state.organization = action.payload
        },
        setToken: (state: AccountState, action: PayloadAction<string | null>) => {
            state.token = action.payload
        }
    }
})

export const { setUser, setOrganization } = accountSlice.actions

export default accountSlice.reducer