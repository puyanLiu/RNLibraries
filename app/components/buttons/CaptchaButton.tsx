import React, { Component } from 'react';
import {
  EmitterSubscription,
  DeviceEventEmitter,
} from 'react-native';
import { theme, fontColor_99 } from 'rn-styles';
import TitleButton from './TitleButton';

export interface ICaptchaButtonProps {
  onPress: () => void;
  /** 是否不可以点击button */
  disabled?: boolean;
  listenerApis?: string[];
}

interface IState {
  disabled: boolean;
  time: number;
  text: string;
}

class CaptchaButton extends Component<ICaptchaButtonProps, IState> {
  timer: any = null;
  events: EmitterSubscription[] = [];

  constructor(props: ICaptchaButtonProps) {
    super(props);
    this.state = {
      disabled: false,
      time: 60,
      text: '获取验证码',
    };
  }

  componentDidMount() {
    const { listenerApis = [] } = this.props;
    this.events = listenerApis.map(name => {
      const event = DeviceEventEmitter.addListener(name, () => {
        if (this.state.time !== 60) {
          return;
        }
        this._countdown();
      });
      return event;
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.events.forEach(event => {
      event.remove();
    });
  }

  _countdown() {
    let time = this.state.time;
    const timer = () => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (time > 1) {
        time--;
        console.log(`captchaWaiting: ${time}`);
        this.setState({ time: time, text: `重新获取(${time})`, disabled: true });
        this.timer = setTimeout(timer, 1000);
      } else {
        this.setState({ time: 60, text: '获取验证码', disabled: false });
      }
    };
    timer();
  }

  _onPress = () => {
    if (this.state.disabled) {
      return false;
    }
    this.props.onPress();
  }

  render() {
    const disabled = this.props.disabled || this.state.disabled;
    return (
      <TitleButton title={this.state.text} disabled={disabled} titleColor={disabled ? fontColor_99 : theme}
      onPress={this._onPress} />
    );
  }
}

export default CaptchaButton;
