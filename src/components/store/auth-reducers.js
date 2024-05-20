import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  showLogin: true,
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    login(state, action) {
        state.token = action.payload.idToken;
        localStorage.setItem('token',state.token);
        state.email = action.payload.email;
        localStorage.setItem('email',state.email);
      console.log("state.email",action.payload.email);
    },
    logout(state) {
      state.token = localStorage.removeItem('token');
      state.email = localStorage.removeItem('email');
    },
    toggleShowLogin(state) {
      state.showLogin = !state.showLogin;
    },
  },
});
export const loginAction = loginSlice.actions;

export default loginSlice.reducer;