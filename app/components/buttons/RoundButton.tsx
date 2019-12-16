import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { fontColor, white } from 'rn-styles';
import Button, { IButtonProps } from './Button';

interface IProps extends IButtonProps {
}

const RoundButton = ({color = fontColor, backgroundColor = white, contentStyle, ...rest}: IProps) => {
  return (
    <Button {...rest} color={color} backgroundColor={backgroundColor}
    contentStyle={[styles.roundStyle, contentStyle]} />
  );
};

const styles = StyleSheet.create({
  roundStyle: {
    width: px2dp(300),
    borderRadius: px2dp(45),
  },
});

export default RoundButton;
