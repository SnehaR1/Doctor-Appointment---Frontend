import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    resetPass: false,
    otpView: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
        },
        updateToken(state, action) {
            state.accessToken = action.payload
        },
        resetPass(state, action) {
            return {
                ...state,
                resetPass: action.payload
            };
        },
        otpView(state, action) {
            return {
                ...state,
                otpView: action.payload
            }
        }


    }
})

export const { login, logout, updateToken, resetPass, otpView } = authSlice.actions;
export default authSlice.reducer;