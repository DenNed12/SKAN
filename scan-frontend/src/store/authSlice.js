import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  companyLimits: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => initialState,
    setCompanyLimits: (state, action) => {
      state.companyLimits = action.payload;
    }
  }
});

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await authAPI.login(credentials);
    localStorage.setItem('accessToken', response.accessToken);
    dispatch(loginSuccess(response.user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setCompanyLimits
} = authSlice.actions;
export default authSlice.reducer;