import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRandomGreeting = createAsyncThunk(
  'randomGreeting/fetchRandomGreeting',
  async () => {
    const response = await fetch('/greetings/random');
    const data = await response.json();
    return data.greeting;
  },
);

const randomGreetingSlice = createSlice({
  name: 'randomGreeting',
  initialState: {
    greeting: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGreeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.greeting = action.payload;
      })
      .addCase(fetchRandomGreeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default randomGreetingSlice.reducer;
export { fetchRandomGreeting };
