import initApi, { IApiConfig } from 'rn-utils/initApi';
import { take } from 'redux-saga/effects';
import * as navigationHelper from 'rn-utils/navigationHelper';

const modelName = 'protocol';

export const protocolType = {
  login: 1,  // 服务与隐私协议(登录注册)
};

interface IApiConfigs {
  getProtocol: IApiConfig;
}
const apiConfigs: IApiConfigs = {
  getProtocol: {
    path: 'getProtocol',
    desc: '获取协议地址',
    token: false,
  },
};

const api = initApi<IApiConfigs>(modelName, apiConfigs);

export const protocolActionsTypes = api.apiActionTypes;
export const protocolActions = api.apiActions;
export const protocolSagas = [...api.sagas, watchProtocol];

function* watchProtocol() {
    while (true) {
      const action = yield take(protocolActionsTypes.getProtocol.success);
      const url = action.payload.res.url;
      if (url) {
        navigationHelper.push('pubWebView', { uri: url, title: '协议' });
      }
    }
}
