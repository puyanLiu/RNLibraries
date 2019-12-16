import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  Image,
  ViewStyle,
  ImageURISource,
  ImageRequireSource,
  ImageStyle,
} from 'react-native';
import defaultStyles, { segWidth } from 'rn-styles';
import Icon from '../Icon';
import Line from '../lines/Line';

export interface IItemProps {
  labelIcon?: string;
  labelIconColor?: string;
  labelIconSize?: number;
  labelText?: string;
  labelTextStyle?: StyleProp<TextStyle>;
  numberOfLabelLines?: number;
  labelImage?: ImageURISource | ImageRequireSource;
  labelImageStyle?: StyleProp<ImageStyle>;
  border?: boolean;
  lineStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Item = (props: IItemProps) => {
  const {
    labelText,
    labelTextStyle,
    labelIcon,
    labelImage,
    labelImageStyle,
    labelIconColor,
    labelIconSize = px2dp(32),
    border = true,
    numberOfLabelLines,
    style,
    lineStyle,
    children,
  } = props;
  return (
    <View style={[defaultStyles.itemView, style]}>
      {labelIcon ? <Icon name={labelIcon} size={labelIconSize} color={labelIconColor} style={styles.icon} /> : null}
      {labelImage ? <Image source={labelImage} style={[styles.img, labelImageStyle]} resizeMode={'contain'} /> : null}
      {labelText ?
      <Text style={[defaultStyles.font_30, labelTextStyle]} numberOfLines={numberOfLabelLines}>{labelText}</Text>
      : null}
      {children}
      {border ? <Line style={[styles.line, lineStyle]} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: px2dp(16),
  },
  img: {
    width: px2dp(50),
    height: px2dp(50),
    marginRight: px2dp(16),
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: segWidth,
    right: segWidth,
  },
});

export default Item;
