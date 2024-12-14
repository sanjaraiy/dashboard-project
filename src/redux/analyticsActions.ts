import { Dispatch } from 'redux';
import { setAnalyticsData } from './analyticsSlice';

export const fetchAnalyticsData = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch('/mockData/analytics.json');
    const data = await response.json();
    dispatch(setAnalyticsData(data));
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
  }
};

