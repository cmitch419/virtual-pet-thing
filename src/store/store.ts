import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../features/pet/petSlice';

const store = configureStore({
  reducer: {
    pet: petReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;