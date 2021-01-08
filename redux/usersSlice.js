import { createSlice } from "@reduxjs/toolkit";
import api from "../utilities/api";
import { setFav, setFavs } from "./roomsSlice";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = usersSlice.actions;

export const userLogin = form => async dispatch => {
  try {
    const {
      status,
      data: { id, token },
    } = await api.login(form);
    if (status === 200) {
      if (id && token) {
        dispatch(logIn({ token, id }));
      }
    }
  } catch (e) {
    alert(e);
  }
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  try {
    const { data } = await api.favs(id, token);
    dispatch(setFavs(data));
  } catch (e) {
    console.warn(e);
  }
};

export const toggleFav = roomId => async (dispatch, getState) => {
  const {
    usersReducer: { id, token },
  } = getState();
  dispatch(setFav({ roomId }));
  try {
    const { status } = await api.toggleFavs(id, roomId, token);
  } catch (e) {
    console.warn(e);
  }
};

export default usersSlice.reducer;
