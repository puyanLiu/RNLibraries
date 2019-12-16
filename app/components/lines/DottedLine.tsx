import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { borderColor } from 'rn-styles';

interface IProps {
  /** 虚线方向 */
  direction?: 'row' | 'column';
  /** 背景颜色 */
  backgroundColor?: string;
  /** 点长度 */
  pointWidth?: number;
  /** 线长度 */
  lineLen?: number;
}

interface IState {
  lineLen: number;
}

class DottedLine extends Component<IProps, IState>  {
  static defaultProps = {
    direction: 'row',
    backgroundColor: borderColor,
    pointWidth: 8,
    lineLen: 1,
  };

  constructor(props: IProps) {
    super(props);
    this._onLayout = this._onLayout.bind(this);

    this.state = {
      lineLen: this.props.lineLen,
    };
  }

  _onLayout(event: any) {
    if (this.state.lineLen === 1) {
      const { width, height } = event.nativeEvent.layout;
      this.setState({
        lineLen: this.props.direction === 'row' ? width : height,
      });
    }
  }

  render() {
    const { pointWidth } = this.props;
    const len = this.state.lineLen / (pointWidth + 2);
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    const direction = this.props.direction;
    return (
    <View
      style={{ flexDirection: direction}}
      onLayout={this._onLayout}
    >
    {
      arr.map((item, index) => {
        return (
        <Text
          style={[direction === 'row' ? styles.dashRowItem : styles.dashColumnItem,
          direction === 'row' ? { height: px2dp(1), width: pointWidth } : {  height: pointWidth, width: px2dp(1) },
          { backgroundColor: this.props.backgroundColor }]}
          key={'dash' + index}
        />);
      })
    }
    </View>
    );
  }
}

const styles = StyleSheet.create({
  dashRowItem: {
      marginRight: px2dp(8),
      flex: 1,
  },
  dashColumnItem: {
    marginTop: px2dp(8),
    flex: 1,
  },
});

export default DottedLine;
