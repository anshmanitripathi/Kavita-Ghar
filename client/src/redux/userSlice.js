import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(window?.localStorage.getItem("user")) ?? {},
    edit: false,
};

const userSlice = createSlice({
    name:"user",
    initialState:{
        login(state, action){
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state, action){
            state.user = null;
            localStorage?.removeItem("user");
        },
        updateProfile(state, action){
            state.edit = user.payload;
        },
    }
});

export default userSlice.reducer;

export function Login(user){
    return (dispatch, getState)=>{
        dispatch(userSlice.action.login(user));
    };
}


export function Logout(){
    return (dispatch, getState)=>{
        dispatch(userSlice.action.logout());
    };
}


export function UpdateProfile(user){
    return (dispatch, getState)=>{
        dispatch(userSlice.action.UpdateProfile(val));
    };
}

