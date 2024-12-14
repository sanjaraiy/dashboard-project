import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
  userTrendData: { month: string; registrations: number }[];
  userStatusData: { status: string; count: number }[];
  userRegionData: { region: string; count: number }[];
}

const initialState: AnalyticsState = {
  userTrendData: [],
  userStatusData: [],
  userRegionData: [],
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (state, action: PayloadAction<AnalyticsState>) => {
      state.userTrendData = action.payload.userTrendData;
      state.userStatusData = action.payload.userStatusData;
      state.userRegionData = action.payload.userRegionData;
    },
  },
});

export const { setAnalyticsData } = analyticsSlice.actions;
export default analyticsSlice.reducer;
