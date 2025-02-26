import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  RegisterResponse,
  loginUser,
  currentUser,
  logoutUser,
  //setToken,
  clearToken,
} from "@/services/api";
import { UserData } from "./authSlice";
import { RegisterFormValues } from "@/components/RegisterForm";
import { LoginFormValues } from "@/components/LoginForm";

interface Error {
  message: string;
}

export const registerUserThunk = createAsyncThunk<
  UserData,
  RegisterFormValues,
  { rejectValue: Error }
>("auth/register", async (values, thunkApi) => {
  try {
    const response: RegisterResponse = await registerUser(values);
    return {
      id: response.id,
      name: response.first_name,
      surname: response.surname,
      patronymic: response.last_name,
      phone: response.phone_number,
      email: response.email,
    };

    //setToken(response.token);
  } catch (error: any) {
    return thunkApi.rejectWithValue({ message: error.message });
  }
});

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (values: LoginFormValues, thunkApi) => {
    try {
      const response = await loginUser(values);
      //setToken(response.token);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue({ message: (error as Error).message });
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  "auth/current",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    //const token = state.auth.token;

    //if (!token) return thunkApi.rejectWithValue(null);
    try {
      //setToken(token);
      const response = await currentUser();
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(null);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const response = await logoutUser();
      clearToken();
      return response;
    } catch (error) {
      thunkApi.rejectWithValue({ message: (error as Error).message });
    }
  }
);
