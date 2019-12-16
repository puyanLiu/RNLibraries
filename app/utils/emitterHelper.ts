import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
interface IEmitterOptions {
  [key: string]: (data: any) => void;
}

/**
 * DeviceEventEmitter辅助类
 * 遍历去除listener
 */
export class EmitterHelper {
  events: { [key: string]: EmitterSubscription };

  constructor(options: IEmitterOptions) {
    this.events = {};
    Object.keys(options).map((key) => {
      if (typeof options[key] === 'function') {
        this.events[key] = DeviceEventEmitter.addListener(key, options[key]);
      } else {
        console.error(`请检查${options[key]}类型定是否为Function`);
      }
    });
  }

  remove() {
    Object.keys(this.events).map((key) => {
      this.events[key].remove();
    });
  }
}
