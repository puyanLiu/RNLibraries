import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import defaultStyles, { white } from 'rn-styles';
import Icon from '../Icon';

interface IProps {
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  onPress?: () => void;
}

const DelButton = ({ style, onPress = () => {}, activeOpacity = 0.8 }: IProps) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.centerRow, styles.btn, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Icon name={'ic_del'} size={px2dp(48)} color={white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#FF4848',
    width: px2dp(150),
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export default DelButton;
