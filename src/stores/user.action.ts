import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    const { result, status } = await apiLogin(payload);

    if (status) {
      localStorage.setItem('t', result.token);
      localStorage.setItem('username', result.username);
      localStorage.setItem('role', result.role + '');
      localStorage.setItem('timezone', result.timezone + '');
      dispatch(
        setUserItem({
          logged: true,
          username: result.username,
          role: result.role,
          timezone: result.timezone
        }),
      );

      return true;
    }

    return false;
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    // const { status } = await apiLogout({ token: localStorage.getItem('t')! });

    // if (status) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        }),
      );

      return true;
    // }

    // return false;
  };
};
