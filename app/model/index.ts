import { fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { userSagas, userReducers } from './user';
import { protocolSagas } from './protocol';
import { otherReducers } from './other';

const sagas = [
  ...userSagas,
  ...protocolSagas,
];

export function* rootSaga() {
  for (const saga of sagas) {
    yield fork(saga);
  }
}

// reducer相关
const appReducer = combineReducers({
  form, // 在reducer中合并的key必须命名为form,如果需要自定义，请看getFormState config
  ...userReducers,
  ...otherReducers,
});
const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};
export { rootReducer };

export * from './dataType';
export * from './actionTypes';
