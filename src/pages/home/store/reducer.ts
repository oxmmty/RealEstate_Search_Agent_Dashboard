import { RealEstateItem } from "@/interface/data/home.interface";
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';

export interface HomePageState {
  data: RealEstateItem[];
  total: number;
}  

const initialState: HomePageState = {
  ...getGlobalState(),
  data: [],
  total: 0
};

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    setHomepageState(state, action: PayloadAction<Partial<HomePageState>>) {
      Object.assign(state, action.payload);
    }
  },
});

export const { setHomepageState } = homepageSlice.actions;

export default homepageSlice.reducer;
