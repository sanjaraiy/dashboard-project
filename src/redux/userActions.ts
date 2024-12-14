import axios from 'axios';
import { Dispatch } from 'redux';
import { setUsers, setLoading } from './userSlice';

export const fetchUsers = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('/mockData/users.json'); // Assuming mock data in /mockData/users.json
    dispatch(setUsers(response.data));
  } catch (error) {
    console.error('Failed to fetch users:', error);
  } finally {
    dispatch(setLoading(false));
  }
};
