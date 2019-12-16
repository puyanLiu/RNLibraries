import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import defaultStyles, { hitSlop, theme, segWidth } from 'rn-styles';

interface IProps {
  style?: StyleProp<ViewStyle>;
  isHasPrompt?: boolean;
  promptText?: string;
  promptTextStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  text: string;
}

const Protocol = ({ style, isHasPrompt = true, promptText, promptTextStyle, onPress, text }: IProps) => {
  return (
    <View style={[defaultStyles.centerRow, styles.container, style]}>
      <Text style={[defaultStyles.font_26, promptTextStyle]}>{isHasPrompt ? promptText || '阅读并同意' : ''}</Text>
      <TouchableOpacity onPress={onPress} hitSlop={hitSlop} activeOpacity={1}>
        <Text style={[defaultStyles.font_26, styles.protocolText]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: segWidth,
  },
  protocolText: {
    color: theme,
  },
});

export default Protocol;
