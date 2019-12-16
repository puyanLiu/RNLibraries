
import { DeviceEventEmitter, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { POPUPSHOW } from '../model/actionTypes';

interface IPopupButton {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

interface ITitle {
  text?: string;
  style?: StyleProp<TextStyle>;
}

interface IContent {
  text?: string | string[];
  style?: StyleProp<TextStyle>;
}

export interface IPopupConfig {
  style?: StyleProp<ViewStyle>;
  title?: ITitle | string;
  content?: IContent | string | string[];
  okBtn?: IPopupButton;
  cancelBtn?: IPopupButton;
  children?: React.ReactNode;
  autoCloseBtn?: boolean;
}

function popup(popupConfig: IPopupConfig) {
  DeviceEventEmitter.emit(POPUPSHOW, popupConfig);
}

export {
  popup,
};
