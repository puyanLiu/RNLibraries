import { handleActions } from 'redux-actions';
import { FETCHSTART, FETCHEND } from './actionTypes';

const loadingReducer = handleActions(
  {
    [FETCHSTART]: (state, action) => {
      return { ...state, loading: action.payload.loading };
    },
    [FETCHEND]: (state, action) => {
      return { ...state, loading: action.payload.loading };
    },
  },
  { loading: false },
);

export const otherReducers = {
  fetch: loadingReducer,
};
