import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie';
const initialState = {
    login: false,
    jwt: null,
    name: null
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        loginUser : (state, action) => {
            state.login = true;
            state.jwt = action.payload.jwt;
            state.name = titleCase(action.payload.name.toLowerCase())

            if (action.payload.rem) {
                const cookies = new Cookies();
                cookies.set('name', action.payload.name, { path: '/' , sameSite:'strict',maxAge:2592000 });
                cookies.set('jwt', action.payload.jwt, { path: '/' ,sameSite:'strict' ,maxAge:2592000});
            }
        },
        logoutUser : (state) => {
            state.login = false;
            state.name = null;
            state.jwt = null;
            const cookies = new Cookies();
            cookies.remove('name');
            cookies.remove('jwt');

        }
    }
})

export const { loginUser,logoutUser } = loginSlice.actions

export default loginSlice.reducer