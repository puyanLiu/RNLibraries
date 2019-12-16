import initApi, { IApiConfig } from 'rn-utils/initApi';
import { handleActions } from 'redux-actions';

const modelName = 'user';

interface IApiConfigs {
  getUserInfo: IApiConfig;
  getLoginSmsCaptcha: IApiConfig;
  getLoginVoiceCaptcha: IApiConfig;
  login: IApiConfig;
  logout: IApiConfig;
}
const apiConfigs: IApiConfigs = {
  getUserInfo: {
    path: 'getUserInfo',
    desc: '获取用户信息',
  },
  getLoginSmsCaptcha: {
    path: 'getLoginSmsCaptcha',
    desc: '获取验证码',
  },
  getLoginVoiceCaptcha: {
    path: 'getLoginVoiceCaptcha',
    desc: '收不到验证码?-->好',
  },
  login: {
    path: 'login',
    desc: '登录',
  },
  logout: {
    path: 'logout',
    desc: '退出账号',
  },
};

const api = initApi<IApiConfigs>(modelName, apiConfigs);

export const userActionsTypes = api.apiActionTypes;
export const userActions = api.apiActions;
export const userSagas = [...api.sagas];
// export const userSagas = [...api.sagas, watchLogin];

/** 自定义saga */
// function* watchLogin() {
//     while(true) {

//     }
// }

/** 自定义reducer */
const userTokenReducer = handleActions(
  {
    [userActionsTypes.login.success]: (state, action) => {
      return { ...state };
    },
    [userActionsTypes.login.success]: {
      next(state, action) {
        return { ...state };
      },
      throw(state) {
        return state;
      },
    },
    [userActionsTypes.getLoginSmsCaptcha.success]: (state, action) => {
      return { ...state };
    },
  },
  { userId: null, token: null },
);

export const userReducers = {
  userToken: userTokenReducer,
};
