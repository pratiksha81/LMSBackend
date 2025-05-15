import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup } from '../services/Login/authService';
import { LoginDTO, Tokens, User } from '../types/Authorization/authModel';

interface AuthState {
  tokens: Tokens | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  tokens: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: LoginDTO, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      return data;
    } catch (error) {
      return rejectWithValue('Invalid username or password');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user: User, { rejectWithValue }) => {
    try {
      await signup(user);
      return user;
    } catch (error) {
      return rejectWithValue('Signup failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.tokens = null;
      localStorage.removeItem('tokens');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
        localStorage.setItem('tokens', JSON.stringify(action.payload));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;