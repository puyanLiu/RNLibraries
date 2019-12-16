import React, { Component } from 'react';
import { StyleSheet, Modal, View, Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import defaultStyles, { white, segWidth } from 'rn-styles';
import { EmitterHelper } from 'rn-utils';
import { connect } from 'react-redux';
import { TOAST } from '../model';

interface IToastProps {
}

interface IToastState {
  visible: boolean;
  text: string;
}

class Toast extends Component<IToastProps, IToastState> {
  emitter: EmitterHelper;
  timer: number;
  callback: () => {};

  constructor(props: IToastProps) {
    super(props);
    this.state = {
      visible: false,
      text: '',
    };
  }

  componentDidMount() {
    this.emitter = new EmitterHelper({
      [TOAST]: (data) => {
        this.setState({
          visible: true,
          text: data.text,
        }, () => {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const { time = 3000 } = data;
          this.callback = data.callback;
          this.timer = setTimeout(() => {
            this._onPress();
          }, time);
        });
      },
    });
  }

  componentWillUnmount() {
    this.emitter.remove();
    if (this.timer) clearTimeout(this.timer);
  }

  _onPress = () => {
    this.setState({
      visible: false,
      text: '',
    }, this.callback);
  }

  render() {
    return (
      <Modal animationType={'fade'} transparent visible={this.state.visible} onRequestClose={() => {}}>
        <TouchableOpacity style={defaultStyles.centerFlex} activeOpacity={1} onPress={this._onPress}>
          <View style={styles.toast}>
              <Text style={styles.text} numberOfLines={4}>{this.state.text}</Text>
            </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

interface IStyle {
  toast: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<IStyle>({
  toast: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: px2dp(30),
    paddingHorizontal: px2dp(50),
    paddingVertical: px2dp(20),
    marginHorizontal: segWidth,
  },
  text: {
    fontSize: px2dp(28),
    color: white,
    lineHeight: px2dp(40),
  },
});

export default connect()(Toast);
