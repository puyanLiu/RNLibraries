import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Image,
  ImageStyle,
  TextStyle,
  Text,
} from 'react-native';
import defaultStyles, { hitSlop, fontColor } from 'rn-styles';

export interface IImageButtonProps {
  source: {};
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  onPress?: () => void;
  imageStyle?: StyleProp<ImageStyle>;
  title?: string;
  titleColor?: string;
  titleStyle?: StyleProp<TextStyle>;
}

const ImageButton = ({ source, style, onPress = () => {}, activeOpacity = 0.8,
                       imageStyle, title, titleColor = fontColor, titleStyle }: IImageButtonProps) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.center, { }, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
      hitSlop={hitSlop}
    >
      <Image source={source} style={[styles.image, imageStyle]} />
      {title ? <Text style={[{ color: titleColor, marginTop: px2dp(20) }, titleStyle]}>{title}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: px2dp(80),
    height: px2dp(80),
  },
});

export default ImageButton;
