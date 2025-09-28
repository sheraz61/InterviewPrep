import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://interviewprep.up.railway.app/api/v1/user';

// Async thunk for LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Async thunk for REGISTRATION
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// Async thunk for OTP verification - UPDATED to match backend
export const verifyOTP = createAsyncThunk(
  'auth/verify',
  async ({ email, code }, { rejectWithValue }) => { // Changed 'otp' to 'code'
    try {
      const response = await axios.post(`${API_URL}/verify`, { // Changed endpoint
        email,
        code // Changed from 'otp' to 'code'
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'OTP verification failed'
      );
    }
  }
);

// Async thunk for resend OTP
export const resendOTP = createAsyncThunk(
  'auth/resend',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/resend`, { email }); // Updated endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to resend OTP'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    pendingEmail: null,
    otpResendCooldown: 0
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.pendingEmail = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setPendingEmail: (state, action) => {
      state.pendingEmail = action.payload;
    },
    clearPendingEmail: (state) => {
      state.pendingEmail = null;
    },
    startOTPResendCooldown: (state) => {
      state.otpResendCooldown = 60;
    },
    decrementOTPResendCooldown: (state) => {
      if (state.otpResendCooldown > 0) {
        state.otpResendCooldown -= 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      
      // REGISTRATION cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingEmail = action.payload.email;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // OTP Verification cases - UPDATED for email verification
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.pendingEmail = null;
        state.error = null;
        
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Resend OTP cases
      .addCase(resendOTP.pending, (state) => {
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { 
  logout, 
  clearError, 
  setPendingEmail, 
  clearPendingEmail,
  startOTPResendCooldown,
  decrementOTPResendCooldown
} = authSlice.actions;

export default authSlice.reducer;