import { loggedUser, loginToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const user = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    loginDetails: {}
  },
  reducers: {
    setUserDetails(state, action) {
      state.loginDetails = action.payload ?? {};
    },
    setLoading(state, action) {
      state.isLoading = action.payload ?? false;
      state.isError = false;
    },
    setError(state, action) {
      state.isError = action.payload ?? false;
      state.isLoading = false;
    },
  },
});

export default user.reducer;

// user login
export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(user.actions.setLoading(true));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users/login`,
        { email, password }
      );
      if (response?.status == 200) {
        loginToken.setToken(response.data.token);
        loggedUser.setDetails(response.data.user);
        dispatch(user.actions.setUserDetails(response.data));
      }
      dispatch(user.actions.setLoading());
      return response;
    } catch (error) {
      dispatch(user.actions.setError(true));
    }
  };

// user register
export const userRegister = (data) => async (dispatch) => {
  try {
    dispatch(user.actions.setLoading(true));
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/users/register`,
      data
    );
    dispatch(user.actions.setLoading());
    return response;
  } catch (error) {
    dispatch(user.actions.setError(true));
  }
};

// setting login token
export const settingLoginToken = (data) => async(dispatch)=>{
  try {
      dispatch(user.actions.setUserDetails(data));
  } catch (error) {
    dispatch(user.actions.setError(true));
  }
};

// user logout
export const userLogout = () => async (dispatch) => {
  try {
    loginToken.removeToken();
    loggedUser.removeDetails();
    dispatch(user.actions.setUserDetails({}));
  } catch (error) {
    dispatch(user.actions.setError(true));
  }
};




