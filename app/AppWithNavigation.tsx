import React, { Component } from 'react';
import { BackHandler, AsyncStorage } from 'react-native';
import AppNavigator from './AppNavigator';
import { Loading } from './components';
import { navigationHelper } from './utils/';

interface IAppWithNavigationState {
}

interface IAppWithNavigationProps {
}

class AppWithNavigation extends Component<IAppWithNavigationProps, IAppWithNavigationState> {

  // didFocusSubscription;
  // _willBlurSubscription;
  // constructor(props: IAppWithNavigationProps) {
  //     super(props);
  //     this._didFocusSubscription = props.navigation.addListener('didFocus', () =>
  //       BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid),
  //     );
  // }

  // componentDidMount() {
  //   this._willBlurSubscription = this.props.navigation.addListener('willBlur', () =>
  //     BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid),
  //   );
  // }

  // componentWillUnmount() {
  //   this._didFocusSubscription && this._didFocusSubscription.remove();
  //   this._willBlurSubscription && this._willBlurSubscription.remove();
  // }

  // onBackButtonPressAndroid = () => {
  //   if (this.isSelectionModeEnabled()) {
  //     this.disableSelectionMode();
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    // persistenceKey为顶级导航器启用持久化
    const getPersistenceFunctions = () => {
      if (!__DEV__) {
        return undefined;
      }
      const persistenceKey = 'persistenceKey';
      const persistNavigationState = async (navState: any) => {
        try {
          await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
        } catch (err) {}
      };
      const loadNavigationState = async () => {
        const jsonString = await AsyncStorage.getItem(persistenceKey);
        return JSON.parse(jsonString);
      };
      return {
        persistNavigationState: persistNavigationState,
        loadNavigationState: loadNavigationState,
      };
    };
    return (
      <AppNavigator
        {...getPersistenceFunctions()}
        ref={navigatorRef => {
          navigationHelper.setTopLevelNavigator(navigatorRef);
        }}
        renderLoadingExperimental={() => <Loading />}
        onNavigationStateChange={(prevState, newState, action) => {
          console.log('导航状态改变', prevState, newState, action);
        }}
      />
    );
  }
}

export default AppWithNavigation;
