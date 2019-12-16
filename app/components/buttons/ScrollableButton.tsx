import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { isIOS } from 'rn-styles';

interface IProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const ScrollableButton = (props: IProps) => {
  if (isIOS) {
    return (
      <TouchableOpacity {...props}>
        {props.children}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableNativeFeedback
      delayPressIn={0}
      background={TouchableNativeFeedback.SelectableBackground()}
      {...props}
    >
      {props.children}
    </TouchableNativeFeedback>
  );
};

export default ScrollableButton;
