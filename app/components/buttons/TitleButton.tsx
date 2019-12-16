import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import defaultStyles, { hitSlop, red, fontColor } from 'rn-styles';
import Icon from '../Icon';

export interface ITitleButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  /** 是否不可以点击button */
  disabled?: boolean;
  /** 按钮的样式 */
  style?: StyleProp<ViewStyle>;
  /** 标题名字 */
  title?: string;
  titleColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  /** 图标名字 */
  iconName?: string;
  /** 图标大小,默认px2dp(44) */
  iconSize?: number;
  /** 图标颜色值 */
  iconColor?: string;
  /** 图标上带红点 */
  redPoint?: boolean;
}

const TitleButton = (props: ITitleButtonProps) => {
  const { onPress, style, title, titleColor = fontColor, iconName, iconSize = px2dp(30),
          iconColor = fontColor, titleStyle,
          disabled, redPoint = false } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, style]}
      hitSlop={hitSlop}
      activeOpacity={0.6}
      disabled={disabled}
    >
      {title ? <Text style={[defaultStyles.font_26, { color: titleColor }, titleStyle]}
      numberOfLines={1}>{title}</Text >
      : null}
      {iconName ? <Icon name={iconName} size={(iconSize)} color={iconColor} /> : null}
      {redPoint ? <View style={styles.redPoint} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: px2dp(24),
    paddingVertical: px2dp(10),
  },
  redPoint: {
    position: 'absolute',
    right: px2dp(18),
    top: px2dp(11),
    height: px2dp(16),
    width: px2dp(16),
    borderRadius: px2dp(8),
    backgroundColor: red,
  },
});

export default TitleButton;
