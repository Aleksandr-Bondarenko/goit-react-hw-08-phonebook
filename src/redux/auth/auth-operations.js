import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (registrationData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/signup", registrationData);
      toast.success(
        `User with name ${data.user.name} was registered successfully.`
      );
      token.set(data.token);

      return data;
    } catch (error) {
      toast.error(`${error}`);
      return rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/login", loginData);
      toast.success(`Welcome, ${data.user.name}!`);
      token.set(data.token);
      return data;
    } catch (error) {
      toast.error(`${error}`);
      return rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/users/logout");
      token.unset();
    } catch (error) {
      toast.error(`${error}`);
      return rejectWithValue(error);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh-user",
  async (_, ThunkAPI) => {
    const currentToken = ThunkAPI.getState().auth.token;

    if (currentToken === null) {
      return ThunkAPI.rejectWithValue();
    }

    token.set(currentToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      toast.error(`${error}`);
      return ThunkAPI.rejectWithValue(error);
    }
  }
);
