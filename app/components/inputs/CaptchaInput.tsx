import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Input, { IInputProps } from './Input';
import CaptchaButton, { ICaptchaButtonProps } from '../buttons/CaptchaButton';
import defaultStyles from 'rn-styles';

interface IProps extends IInputProps, ICaptchaButtonProps {
  inputStyle?: StyleProp<ViewStyle>;
  getInputRef?: (ref: any) => void;
}

const CaptchaInput = (props: IProps) => {
  const { style, inputStyle, onPress, listenerApis, disabled, getInputRef, ...rest } = props;
  return (
    <View style={[defaultStyles.alignItemsCenterRow, style]}>
      <Input {...rest} style={inputStyle} ref={ref => getInputRef(ref)} />
      <CaptchaButton onPress={onPress} listenerApis={listenerApis} disabled={disabled} />
    </View>
  );
};

export default CaptchaInput;
