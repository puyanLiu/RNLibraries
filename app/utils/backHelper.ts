import { ToastAndroid, NativeModules } from 'react-native';
import { store } from '../store';
import { isAndroid } from 'rn-styles';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { hideKeyboard } from './helper';
import { pop, _navigator } from './navigationHelper';

interface IBackAction {
  [routeName: string]: () => void;
}

let backTwice = false;
let timer: NodeJS.Timeout;
const backActions: IBackAction = {};

/**
 * 传递自定义返回键处理的方法
 * @param {() => void} action
 */
function backHandle(action: () => void) {
  hideKeyboard().then(() => {
    const { index, routes } = _navigator.state.nav;
    const routeName = routes[index].routeName;
    backActions[routeName] = action;
  });
}

/**
 * 返回键处理
 * @returns {boolean}
 */
function backAction(navigation: NavigationScreenProp<NavigationRoute>): void {
  const { loading = false } = store.getState().fetch;
  const routeName = navigation.state.routeName;
  if (!loading) {
    // 判断当前路由是否自定义返回键方法
    if (backActions[routeName] instanceof Function) {
      backActions[routeName]();
    } else {
      pop();
    }
    return;
  }
  if (isAndroid) {
    if (!backTwice) {
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      backTwice = true;
      timer = setTimeout(() => {
        backTwice = false;
      }, 2000);
    } else {
      backTwice = false;
      clearTimeout(timer);
      NativeModules.CustomBridgeManager.exitApp();
    }
  } else {
    pop();
  }
}

export {
  backAction,
  backHandle,
};
