import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        },
        updateUserStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }


    },
});

export const { signInStart, signInSuccess, signInFailure,signOutSuccess
    ,updateUserFailure,updateUserSuccess,updateUserStart, deleteUserFailure, deleteUserSuccess, deleteUserStart
} = userSlice.actions;

export default userSlice.reducer;

