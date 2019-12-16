import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import defaultStyles, { themeLight, theme, disabledColor, fontWeightMedium } from 'rn-styles';

export interface IProps {
  onPress?: (e?: any) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  startColor?: string;
  endColor?: string;
  borderRadius?: number;
  title?: string;
  disableColor?: string;
}

const LGButton = (props: IProps) => {
  const {
    onPress,
    disabled,
    style,
    titleStyle,
    startColor = themeLight,
    endColor = theme,
    disableColor = disabledColor,
    borderRadius = px2dp(45),
    title = '渐变按钮',
  } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]} disabled={disabled} activeOpacity={0.6}>
      <LinearGradient
        colors={disabled ? [disableColor, disableColor] : [startColor, endColor]}
        locations={[0, 1]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        style={[defaultStyles.centerFlex, { borderRadius: borderRadius }]}
      >
        <Text style={[styles.text, { color: disabled ? 'rgba(255,255,255,0.6)' : '#FFFFFF' }, titleStyle]}>
        {title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface IStyle {
  btn: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<IStyle>({
  btn: {
    width: px2dp(520),
    height: px2dp(90),
    alignSelf: 'center',
  },
  text: {
    fontSize: px2dp(30),
    backgroundColor: 'transparent',
    fontWeight: fontWeightMedium,
  },
});

export default LGButton;
