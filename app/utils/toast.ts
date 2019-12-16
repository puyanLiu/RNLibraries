
import { DeviceEventEmitter } from 'react-native';
import { TOAST } from '../model/actionTypes';

export interface IToastConfig {
  /* 提示文案 */
  text: string;
  /* 显示时长(默认3s) */
  time?: number;
  callback?: () => void;
}

function toast(toastConfig: IToastConfig) {
  DeviceEventEmitter.emit(TOAST, toastConfig);
}

export {
  toast,
};
