import React from 'react';
import { TextProperties, StyleSheet, View } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import config from '../assets/font/icon.json';

const IconComponent = createIconSetFromIcoMoon(config);

export interface IIconProps extends TextProperties {
  /** 图标名字 */
  name: string;
  /** 图标大小,默认:px2dp(30) */
  size?: number;
  /** 图标颜色值 */
  color?: string;
}

const Icon = ({ size, style, ...rest }: IIconProps) => {
  return (
    <IconComponent size={size || px2dp(30)} style={[styles.iconView, style]} {...rest} />
  );
};

const styles = StyleSheet.create({
  iconView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});

export default Icon;
