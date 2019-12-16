import { NavigationRouteConfig } from 'react-navigation';
import DecoratorDemo from './decoratorDemo';
import JumpDemo from './jumpDemo';
import Demo from './index';

interface IRouteMap {
  [routeKey: string]: NavigationRouteConfig<any, any>;
}

const demoStackRoutes: IRouteMap = {
  demo: {
    screen: Demo,
    navigationOptions: {
      title: 'Demo',
    },
  },
  decorateDemo: {
    screen: DecoratorDemo,
    navigationOptions: {
      title: '装饰器',
    },
  },
  jumpDemo: {
    screen: JumpDemo,
    navigationOptions: {
      title: '跳转',
    },
  },
};

export default demoStackRoutes;
