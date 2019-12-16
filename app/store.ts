/**
 * redux应用中，只允许有一个store对象，管理应用的state
 * 可以理解为一个存放APP内所有组件的state仓库
 * 可以通过 combineReducers(reducers) 来实现对 state 管理的逻辑划分（多个 reducer）
 */
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { rootSaga, rootReducer } from './model';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { composeWithDevTools } from 'remote-redux-devtools';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware] as any;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userToken'],
  // stateReconciler: (persist: any) => {
  //   console.log('持久化数据', persist);
  //   return persist;
  // },
};

const _persistReducer = persistReducer(persistConfig, rootReducer);
let _enhancer;

if (__DEV__) {
  // 日志中间件
  middlewares.push(logger);
  const composeEnhancers = composeWithDevTools({ realtime: true, hostname: 'localhost', port: 8001 });
  _enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // 禁用黄屏警告
  console.disableYellowBox = true;
} else {
  _enhancer = compose(applyMiddleware(...middlewares));
}

export const store: any = createStore(_persistReducer, _enhancer);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store, null, () => {
});
