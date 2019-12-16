import React from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import { fontColor, StatusBarHeight, segWidth, width, NavBarHeight, white, fontWeightMedium } from 'rn-styles';
import TitleButton from '../buttons/TitleButton';
import Line from '../lines/Line';

interface IProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  /** 图标名字 */
  leftIconName?: string;
  /** 图标颜色值 */
  leftIconColor?: string;
  leftOnPress?: (event: GestureResponderEvent) => void;
  /** 图标名字 */
  rightIconName?: string;
  /** 图标颜色值 */
  rightIconColor?: string;
  rightOnPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  border?: boolean;
  lineStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

const Header = ({ title, titleStyle, leftIconName, leftIconColor = fontColor, leftOnPress,
                  rightIconName, rightIconColor = fontColor, rightOnPress, style, border = false,
                  lineStyle, backgroundColor = white }: IProps) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }, style]}>
      <TitleButton iconName={leftIconName} iconColor={leftIconColor} onPress={leftOnPress} />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <TitleButton iconName={rightIconName} iconColor={rightIconColor} onPress={rightOnPress} />
      {border ? <Line style={[styles.line, lineStyle]} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: StatusBarHeight + NavBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: segWidth,
    paddingVertical: px2dp(10),
    position: 'absolute',
    zIndex: 999,
    paddingTop: StatusBarHeight,
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: px2dp(32),
    color: fontColor,
    fontWeight: fontWeightMedium,
    alignSelf: 'center',
    textAlign: 'center',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: px2dp(2),
  },
});

export default Header;
