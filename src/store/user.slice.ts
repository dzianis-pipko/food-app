import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import type { AuthInterface } from '../interfaces/auth.interface';
import { PREFIX_URL } from '../helpers/API';
import axios, { AxiosError } from 'axios';
import type { Profile } from '../interfaces/user.interface';
import type { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistetState {
    jwt: string | null
}

export interface UserState {
    jwt: string | null
    loginErrorMessage?: string
    registerErrorMessage?: string
    profile?: Profile
}

const initialState: UserState = {
    jwt: loadState<UserPersistetState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
}

export const login = createAsyncThunk('user/login',
    async (params: {email: string, password: string}) => {
        try{
            const {data} = await axios.post<AuthInterface>(`${PREFIX_URL}/auth/login`, {
                email: params.email,
                password: params.password
            })
            return data;
        }catch(e){
            if(e instanceof AxiosError){
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const register = createAsyncThunk('user/register',
    async (params: {email: string, password: string, name: string}) => {
        try{
            const {data} = await axios.post<AuthInterface>(`${PREFIX_URL}/auth/register`, {
                email: params.email,
                password: params.password,
                name: params.name
            })
            return data;
        }catch(e){
            if(e instanceof AxiosError){
                throw new Error(e.response?.data.message)
            }
        }
    }
)

export const getProfile = createAsyncThunk<Profile, void, {state: RootState}>('user/getProfile',
    async (_, thunkApi) => {
        const jwt = thunkApi.getState().user.jwt
        const {data} = await axios.get<Profile>(`${PREFIX_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(!action.payload){
                return
            }
            state.jwt = action.payload.access_token
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload
        })
        builder.addCase(register.fulfilled, (state, action) => {
            if(!action.payload){
                return
            }
            state.jwt = action.payload.access_token
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message
        })
    }
})

export default userSlice.reducer
export const UserActions = userSlice.actions;