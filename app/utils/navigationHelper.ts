import { NavigationActions, StackActions,
   NavigationScreenProp, NavigationRoute, NavigationParams, NavigationNavigateAction,
   NavigationResetActionPayload,
   } from 'react-navigation';
import { hideKeyboard } from './helper';

export let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

/**
 * 导航到另一条路由
 * @param routeName
 * @param params
 */
function navigate(routeName: any, params: any = null) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName, params,
    }),
  );
}

/**
 * 回到之前的状态
 * @param key
 */
function back(key?: string | null) {
  hideKeyboard().then(() => {
    _navigator.dispatch(
      NavigationActions.back({
        key,
      }),
    );
  });
}

/**
 * 设置给定路由的参数
 * @param key
 * @param params
 */
function setKeyParams(key: string, params: NavigationParams) {
  _navigator.dispatch(
    NavigationActions.setParams({
      key, params,
    }),
  );
}

function setParams(params: NavigationParams) {
  console.log(_navigator, _navigator.state.nav);
  const { index, routes } = _navigator.state.nav;
  let key = routes[index].key;
  const subRoutes = routes[index].routes;
  if (subRoutes) {
    const subIndex = routes[index].index;
    key = subRoutes[subIndex].key;
  }
  setKeyParams(key, params);
}

function validateRouteName(navigation: NavigationScreenProp<NavigationRoute>, routeName: string) {
  return navigation.state.routeName === routeName;
}

function reset(options: NavigationResetActionPayload) {
  hideKeyboard().then(() => {
    _navigator.dispatch(
      StackActions.reset(options),
    );
  });
}

function replace(routeName: string, params?: NavigationParams, action?: NavigationNavigateAction) {
  hideKeyboard().then(() => {
    _navigator.dispatch(
      StackActions.replace({
        routeName, params, action,
      }),
    );
  });
}

function push(routeName: string, params?: NavigationParams, action?: NavigationNavigateAction) {
  hideKeyboard().then(() => {
    _navigator.dispatch(
      StackActions.push({
        routeName, params, action,
      }),
    );
  });
}

function pop(n?: number, params?: { immediate?: boolean }) {
  hideKeyboard().then(() => {
    _navigator.dispatch(
      StackActions.pop({
        n, immediate: params && params.immediate,
      }),
    );
  });
}

function popToTop(params?: { immediate?: boolean }) {
  hideKeyboard().then(() => {
    _navigator.dispatch(
      StackActions.popToTop({
        immediate: params && params.immediate,
      }),
    );
  });
}

export {
  navigate,
  setTopLevelNavigator,
  back,
  setKeyParams,
  setParams,
  validateRouteName,
  reset,
  replace,
  push,
  pop,
  popToTop,
};
