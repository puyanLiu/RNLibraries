import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import defaultStyles, { white, fontColor_99, fontColor_cc, segWidth } from 'rn-styles';
import Item, { IItemProps } from './Item';
import Icon from '../Icon';
import Line from '../lines/Line';

interface IProps extends IItemProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  disabled?: boolean;
  imageRight?: any;
  iconRight?: string;
  iconRightColor?: string;
  rightText?: string;
  rightTextStyle?: StyleProp<TextStyle>;
  rightTextColor?: string;
  chilren?: React.ReactNode;
  isShowRightIcon?: boolean;
}

const TouchItem = ({
  onPress,
  style,
  activeOpacity,
  disabled,
  imageRight,
  iconRight = 'arrow_right',
  iconRightColor = fontColor_cc,
  rightText,
  rightTextStyle,
  rightTextColor,
  children,
  isShowRightIcon = true,
  border = true,
  lineStyle,
  ...rest }: IProps) =>  {

  return (
    <View>
       <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} disabled={disabled}>
        <Item style={[{ backgroundColor: white }, style]} labelIconSize={px2dp(34)} border={false} {...rest}>
          <View style={styles.rightView}>
            <Text style={[defaultStyles.font_28, styles.desText, rightTextStyle,
              rightTextColor ? { color: rightTextColor } : null]} numberOfLines={1}>
              {rightText}
            </Text>
            {isShowRightIcon ? <Icon name={iconRight} size={px2dp(34)} color={iconRightColor} /> : null}
            {children}
          </View>
        </Item>
      </TouchableOpacity>
      {border ? <Line style={[styles.line, lineStyle]} /> : null}
  </View>
  );
};

const styles = StyleSheet.create({
  rightView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  desText: {
    marginRight: px2dp(16),
    color: fontColor_99,
    height: null,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: segWidth,
    right: segWidth,
  },
});

export default TouchItem;
