import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { lineWidth, borderColor } from 'rn-styles';

interface IProps {
  direction?: 'row' | 'column';
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const HorizontalLine = ({ direction = 'row', color = borderColor, style }: IProps) => {
  return (
    <View style={[direction === 'row' ? { height: lineWidth } : { width : lineWidth },
    { backgroundColor: color }, style]} />
  );
};

export default HorizontalLine;
