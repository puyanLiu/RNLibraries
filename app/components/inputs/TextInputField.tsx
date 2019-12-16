import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProperties,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { WrappedFieldProps } from 'redux-form';
import defaultStyles, { fontColor_99, theme, segWidth, fontColor, hitSlop, fontColor_cc } from 'rn-styles';
import Icon from '../Icon';
import Line from '../lines/Line';

export interface ITextInputFieldOwnProps extends TextInputProperties {
  type?: 'bankcard' | 'phone' | 'IDCard' | 'noNum' | 'passward';
  labelText?: string;
  labelIcon?: string;
  border?: boolean;
  lineStyle?: StyleProp<ViewStyle>;
  textAlign?: 'auto' | 'left' | 'right' | 'center';
  initValue?: string;
  style?: StyleProp<ViewStyle>;
  getRef?: any;
}

interface ITextInputFieldProps extends ITextInputFieldOwnProps, WrappedFieldProps {
}

interface IState {
  value: string;
}

class TextInputField extends Component<ITextInputFieldProps, IState> {
  static defaultProps = {};
  _textInput: any;

  constructor(props: ITextInputFieldProps) {
    super(props);
    let value = this.props.input.value || this.props.initValue || null;
    if (value) {
      value = this._inputFormat(value);
    }
    this.state = { value };
  }

  componentWillReceiveProps(nextProps: ITextInputFieldProps) {
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', nextProps, this.props);
    // if (nextProps.input && nextProps.input.value !== this.props.input.value) {
    //   const { onChange } = this.props.input;
    //   if (onChange) {
    //     onChange(this.props.input.value);
    //   }
    // }
  }

  blur = () => {
    this._textInput.blur();
  }

  focus = () => {
    this._textInput.focus();
  }

  _inputFormat(value: string) {
    let text = value;
    switch (this.props.type) {
      case 'bankcard': {
        text = text.replace(/\D/g, '');
        text = text.substring(0, 19);
        text = text.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
        break;
      }
      case 'phone': {
        text = text.replace(/\D/g, '');
        text = text.substring(0, 11);
        const valueLen = text.length;
        if (valueLen > 3 && valueLen < 8) {
          text = `${text.substr(0, 3)} ${text.substr(3)}`;
        } else if (valueLen >= 8) {
          text = `${text.substr(0, 3)} ${text.substr(3, 4)} ${text.substr(7)}`;
        }
        break;
      }
      case 'IDCard': {
        text = text.replace(/\s/g, '');
        text = text.substring(0, 18);
        const textLen = text.length;
        if (textLen > 6 && textLen <= 10) {
          text = `${text.substr(0, 6)} ${text.substr(6)}`;
        } else if (textLen > 10 && textLen <= 14) {
          text = `${text.substr(0, 6)} ${text.substr(6, 4)} ${text.substr(10)}`;
        } else if (textLen > 14) {
          text = `${text.substr(0, 6)} ${text.substr(6, 4)} ${text.substr(10, 4)} ${text.substr(14, 4)}`;
        }
        break;
      }
      case 'noNum': {
        text = text.replace(/\d/g, '');
        break;
      }
      default:
        break;
    }
    return text;
  }

  _onChange(value: string) {
    this.setState({ value: this._inputFormat(value) });
    const { onChange } = this.props.input;
    if (onChange) {
      onChange(value);
    }
  }

  _clearValue() {
    this.props.input.onChange('');
  }

  renderClearIcon() {
    const { input, meta } = this.props;
    if (input.value && meta.active) {
      return (
        <TouchableOpacity onPress={() => { this._clearValue(); }} hitSlop={hitSlop} activeOpacity={0.6}>
          <Icon name={'error'} style={styles.clearIcon} size={px2dp(28)} />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { labelText, labelIcon, border, lineStyle, textAlign, style, maxLength, type, keyboardType, autoFocus,
            editable, getRef,
            children, ...rest } = this.props;
    let _maxLength = maxLength;
    let _keyboardType = keyboardType || 'default';
    if (type === 'bankcard') {
      _keyboardType = 'phone-pad';
      _maxLength = 23;
    } else if (type === 'phone') {
      _keyboardType = 'phone-pad';
      _maxLength = 13;
    } else if (type === 'IDCard') {
      _maxLength = 21;
    } else if (type === 'passward') {
      _maxLength = maxLength || 20;
    }
    return (
      <View style={[defaultStyles.alignItemsCenterRow, styles.container, style]}>
        {labelText ? <Text style={[defaultStyles.font_30, { paddingRight: px2dp(20)}]}>{labelText}</Text> : null}
        {labelIcon ? <Icon name={labelIcon} style={styles.icon} size={px2dp(30)} /> : null}
        <TextInput
          {...rest}
          style={[defaultStyles.font_28,
            { color: this.state.value ? fontColor : fontColor_99, textAlign: textAlign }, styles.input]}
          clearButtonMode={'while-editing'}
          placeholderTextColor={fontColor_99}
          underlineColorAndroid={'transparent'}
          keyboardType={_keyboardType}
          maxLength={_maxLength}
          secureTextEntry={type === 'passward'}
          autoFocus={autoFocus}
          editable={editable}
          ref={ref => {
            this._textInput = ref;
            if (getRef) {
              getRef(ref);
            }
          }}
          onChange={(event) => { this._onChange(event.nativeEvent.text); }}
          value={this.state.value}
        />
        {Platform.OS !== 'ios' ? this.renderClearIcon() : null}
        {this.renderClearIcon()}
        {children}
        {border ? <Line style={[styles.line, lineStyle]} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: px2dp(100),
    paddingHorizontal: px2dp(15),
  },
  icon: {
    paddingRight: px2dp(20),
    color: theme,
  },
  input: {
    flex: 1,
    height: px2dp(100),
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: segWidth,
    right: segWidth,
  },
  clearIcon: {
    color: fontColor_cc,
  },
});

export default TextInputField;
