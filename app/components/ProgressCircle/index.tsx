import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ART,
} from 'react-native';
import Arc from './Arc';
const { Surface } = ART;

interface IProps {
  radius: number; // 半径
  strokeWidth: number; // 内环高度
  bgColor: string; // 内环背景填充颜色
  selectColor: string; // 内环背景选中填充颜色
  progress: number;
}

interface IState {
  progress: number;
}

class Index extends Component<IProps, IState> {
  intervalTimer: any;

  static defaultProps = {
    radius: 100,
    strokeWidth: 10,
    bgColor: '#f5f5f5',
    selectColor: '#f00',
    progress: 0.5,
  };

  // 设置进度 取值范围 0 - 1
  setProgress(progress: number) {
    if (progress >= 1.0) return;
    this.setState({
        progress: progress,
    });
}

  constructor(props: IProps) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  componentDidMount() {
    this.intervalTimer = setInterval(() => {
      if (this.state.progress >= this.props.progress) {
        return;
      }
      this.setState({
        progress: this.state.progress + 0.01,
      });
    }, 50);
  }

  componentWillUnmount() {
    this.intervalTimer && clearTimeout(this.intervalTimer);
  }

  render() {
    const {
      bgColor,
      selectColor,
      radius,
      strokeWidth,
    } = this.props;
    const progress = this.state.progress;
    const CIRCLE = Math.PI * 2;
    const angle = progress * CIRCLE;
    return (
      <View>
        <Surface
          width={radius * 2}
          height={radius * 2}
        >
        <Arc
          startAngle={angle}
          endAngle={CIRCLE}
          radius={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <Arc
          startAngle={0}
          endAngle={angle}
          radius={radius}
          stroke={selectColor}
        />
        </Surface>
        <View style={[styles.contentView, {
            width: (radius - strokeWidth) * 2,
            height: (radius - strokeWidth) * 2,
            left: strokeWidth,
            top: strokeWidth}]}
        >
            {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
