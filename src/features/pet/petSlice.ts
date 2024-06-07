import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PetState {
  name: string;
  hunger: number;
  happiness: number;
}

const initialState: PetState = {
  name: 'Slorp',
  hunger: 0,
  happiness: 100,
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    feed: (state) => {
      state.hunger = Math.max(0, state.hunger - 10);
      state.happiness = Math.min(100, state.happiness + 10);
    },
    play: (state) => {
      state.hunger = Math.min(100, state.hunger + 10);
      state.happiness = Math.min(100, state.happiness + 20);
    },
    rename: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { feed, play, rename } = petSlice.actions;

export default petSlice.reducer;
