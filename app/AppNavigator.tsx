import React from 'react';
import { StyleSheet, Image, Easing, Animated, View, ImageSourcePropType } from 'react-native';
import { createAppContainer, NavigationRouteConfig, NavigationScreenProp, NavigationState,
  getActiveChildNavigationOptions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import StackViewStyleInterpolator from
'react-navigation-stack/lib/module/views/StackView/StackViewStyleInterpolator';
import { theme, themeLight, white, fontWeightMedium, fontColor, isIOS, StatusBarHeight, NavBarHeight } from 'rn-styles';
import { backHelper } from './utils';
import LinearGradient from 'react-native-linear-gradient';
import { TabBarBottom, TitleButton } from './components';

import home1 from './assets/icons/tab_home_1.png';
import home2 from './assets/icons/tab_home_2.png';
import bill1 from './assets/icons/tab_bill_1.png';
import bill2 from './assets/icons/tab_bill_2.png';
import mine1 from './assets/icons/tab_mine_1.png';
import mine2 from './assets/icons/tab_mine_2.png';

import HomeIndex from './containers/home/HomeIndex';
import HomeDetail from './containers/home/HomeDetail';
import BillIndex from './containers/bill/BillIndex';
import BillDetail from './containers/bill/BillDetail';
import MineIndex from './containers/mine/MineIndex';
import MineDetail from './containers/mine/MineDetail';

import Login from './containers/account/Login';
import PubWebView from './containers/common/PubWebView';

import demoNav from './containers/demo/demoNav';

interface IRouteMap {
  [routeKey: string]: NavigationRouteConfig<any, any>;
}

interface ITabRouteMap {
  [routeKey: string]: NavigationRouteConfig<any, any> & {
    tabName: string;
    activeIcon: ImageSourcePropType;
    inActiveIcon: ImageSourcePropType;
  };
}

const tabRoutes: ITabRouteMap = {
  home: {
    screen: HomeIndex,
    tabName: '首页',
    activeIcon: home1,
    inActiveIcon: home2,
    navigationOptions: {
      header: null,
      tabBarLabel: '首页',
    },
  },
  bill: {
    screen: BillIndex,
    tabName: '账单',
    activeIcon: bill1,
    inActiveIcon: bill2,
    navigationOptions: {
      header: null,
      tabBarLabel: '账单',
    },
  },
  mine: {
    screen: MineIndex,
    tabName: '我的',
    activeIcon: mine1,
    inActiveIcon: mine2,
    navigationOptions: {
      header: null,
      tabBarLabel: '我的',
    },
  },
};

function map2array(routes: ITabRouteMap) {
  const routesArray: any[] = [];
  Object.keys(routes).forEach((key, index) => {
    routesArray.push({...routes[key], routeName: key});
  });
  return routesArray;
}

const indexNavigator = createBottomTabNavigator(tabRoutes, {
  // tabBarComponent: (props) => <TabBarBottom {...props} tabRoutes={map2array(tabRoutes)} />,
  initialRouteName: 'home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor, horizontal }) => {
      const routeName = navigation.state.routeName;
      return (
      <Image
        source={focused ? tabRoutes[routeName].activeIcon : tabRoutes[routeName].inActiveIcon}
        style={styles.img}
      />
      );
    },
    tabBarOnPress: ({ defaultHandler }) => {
      console.log('tabBarOnPress~~~~~', navigation);
      defaultHandler();
    },
  }),
  tabBarOptions: {
    activeTintColor: theme,
  },
});

indexNavigator.navigationOptions = ({ navigation, screenProps }: {
  navigation: NavigationScreenProp<NavigationState>;
  screenProps: { [key: string]: any };
}) => {
  const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
  return {
    header: childOptions.header,
    title: childOptions.title,
  };
};

const stackRoutes: IRouteMap = {
  index: {
    screen: indexNavigator,
    navigationOptions: { headerLeft: null },
  },
  homeDetail: {
    screen: HomeDetail,
  },
  billDetail: {
    screen: BillDetail,
    navigationOptions: {
      title: 'bill详情页',
    },
  },
  mineDetail: {
    screen: MineDetail,
    navigationOptions: {
      title: 'mine详情页',
    },
  },
  login: {
    screen: Login,
    navigationOptions: {
      title: 'login',
      header: null,
    },
  },
  pubWebView: {
    screen: PubWebView,
  },
  ...demoNav,
};

const styles = StyleSheet.create({
  img: {
    width: px2dp(44),
    height: px2dp(44),
  },
  header: {
    backgroundColor: white,
    height: isIOS ? NavBarHeight : NavBarHeight + StatusBarHeight, // react-navigation ios端会自动适配高度
    paddingTop: isIOS ? 0 : StatusBarHeight,
    // elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerTitle: {
    flex: 1,
    color: fontColor,
    fontSize: px2dp(32),
    fontWeight: fontWeightMedium,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

const headerBg = (
  <LinearGradient
    colors={[theme, themeLight]}
    locations={[0, 1]}
    start={{ x: 0.0, y: 0.0 }}
    end={{ x: 0.0, y: 1.0 }}
    style={{ flex: 1 }}
  />
);

const stackConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      // headerBackground: headerBg,
      headerLeft: (
        <TitleButton
          iconName={'arrow_left'}
          iconColor={fontColor}
          onPress={() => backHelper.backAction(navigation)}
        />
      ),
      headerRight: <View />,
    }
  ),
  // mode: 'modal',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index, route } = scene;
      const { routeName } = route;
      const scenesLastRouteName = sceneProps.scenes.slice(-1)[0].route.routeName;
      if (routeName === 'login' || scenesLastRouteName === 'login') {
        // 上下切换
        const height = layout.initHeight;
        // 沿Y轴平移
        const translateY = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [height, 0, 0],
        });
        // 透明度
        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
        });
        return { opacity, transform: [{ translateY }] };
      } else {
        // 左右切换
        const Width = layout.initWidth;
        // 沿X轴平移
        const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [Width, 0, -(Width - 10)],
        });
        // 透明度
        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
        });
        return {opacity, transform: [{translateX}]};
      }
    },
    // screenInterpolator: (sceneProps) => {
    //   console.log('~~~~~~~~~~~~~~~~~', sceneProps);
    //   const routeName = sceneProps.scene.route.routeName;
    //   if (routeName === 'login') {
    //     return StackViewStyleInterpolator.forVertical(sceneProps);
    //   }
    //   return StackViewStyleInterpolator.forHorizontal(sceneProps);
    // },
  }),
};

export default createAppContainer(createStackNavigator(stackRoutes, stackConfig));
