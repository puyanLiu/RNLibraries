import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StyleProp,
  View,
} from 'react-native';
import defaultStyles, { white, theme, disabledColor, fontWeightMedium, segWidth } from 'rn-styles';

export interface IButtonProps {
  onPress?: (e?: any) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  borderRadius?: number;
  title?: string;
  disableColor?: string;
  color?: string;
  backgroundColor?: string;
}

const Button = (props: IButtonProps) => {
  const {
    onPress,
    disabled,
    style,
    contentStyle,
    titleStyle,
    borderRadius = px2dp(20),
    title = '按钮',
    disableColor = disabledColor,
    color = white,
    backgroundColor = theme,
  } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]} disabled={disabled} activeOpacity={0.6}>
      <View style={[defaultStyles.centerFlex,
        { borderRadius: borderRadius, backgroundColor: disabled ? disableColor : backgroundColor },
        contentStyle]}>
        <Text style={[styles.text, { color: color }, titleStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface IStyle {
  btn: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<IStyle>({
  btn: {
    height: px2dp(90),
  },
  text: {
    fontSize: px2dp(30),
    backgroundColor: 'transparent',
    fontWeight: fontWeightMedium,
    paddingHorizontal: segWidth,
  },
});

export default Button;
