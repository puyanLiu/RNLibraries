import React from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { fontColor } from 'rn-styles';
import TitleButton from '../buttons/TitleButton';

interface IProps {
  /** 图标名字 */
  icon1Name?: string;
  /** 图标颜色值 */
  icon1Color?: string;
  icon1OnPress?: (event: GestureResponderEvent) => void;
  /** 图标名字 */
  icon2Name?: string;
  /** 图标颜色值 */
  icon2Color?: string;
  icon2OnPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const HeaderLeftTwoBtn = (
  { icon1Name = 'arrow_left', icon1Color = fontColor, icon1OnPress,
    icon2Name = 'public_close', icon2Color = fontColor, icon2OnPress,
    style }: IProps) => {
  return (
    <View style={[styles.container, style]}>
      <TitleButton iconName={icon1Name} iconColor={icon1Color} onPress={icon1OnPress} />
      <TitleButton iconName={icon2Name} iconColor={icon2Color} onPress={icon2OnPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default HeaderLeftTwoBtn;
