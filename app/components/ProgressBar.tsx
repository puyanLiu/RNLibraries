import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
} from 'react-native';
import { fontColor_cc, theme } from 'rn-styles';

export interface IProgressBarProps {
  /** 当前进度 */
  progress: number;
  /** 进度条颜色, 默认theme */
  progressColor?: string;
  /** 进度条背景颜色, 默认fontColor_cc */
  progressBgColor?: string;
  /** 进度变化动画时长, 默认100毫秒 */
  progressAniDuration?: number;
  /** 进度条样式 */
  progressStyle?: StyleProp<ViewStyle>;
}

interface IProgressBarState {}

class ProgressBar extends Component<IProgressBarProps, IProgressBarState> {
  static defaultProps = {
    progress: 0,
    progressColor: theme,
    progressBgColor: fontColor_cc,
    progressAniDuration: 100,
  };
  _progressAni: any = new Animated.Value(0);
  _totalWidth: number = 0;

  componentWillReceiveProps(nextProps: IProgressBarProps) {
    if (nextProps.progress !== this.props.progress) {
      this._start();
    }
  }

  _start() {
    const { progress, progressAniDuration } = this.props;
    if (progress >= 0) {
      Animated.timing(this._progressAni, {
        toValue: progress * this._totalWidth,
        duration: progressAniDuration,
        easing: Easing.linear,
      }).start();
    }
  }

  _onLayout({
    nativeEvent: {
      layout: { width },
    },
  }) {
    if (width > 0 && this._totalWidth !== width) {
      this._totalWidth = width;
      this._start();
    }
  }

  render() {
    const { progressStyle, progressColor, progressBgColor } = this.props;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: progressBgColor },
          progressStyle,
        ]}
        onLayout={e => this._onLayout(e)}
      >
        <Animated.View
          style={[
            styles.animView,
            { width: this._progressAni, backgroundColor: progressColor },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: px2dp(20),
    borderRadius: 0.5 * px2dp(20),
    backgroundColor: 'red',
  },
  animView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'red',
    borderRadius: 0.5 * px2dp(20),
  },
});

export default ProgressBar;
