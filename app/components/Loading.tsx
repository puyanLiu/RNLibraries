import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Spinkit from 'react-native-spinkit';
import { EmitterHelper, INormalProps } from 'rn-utils';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { FETCHSTART, FETCHEND } from '../model/actionTypes';
import defaultStyles, { width, height, white } from 'rn-styles';

interface ILoadingProps extends INormalProps {
  visible?: boolean;
}

interface ILoadingState {
  visible: boolean;
  text: string;
}

class Loading extends Component<ILoadingProps, ILoadingState> {
  emitter: EmitterHelper;

  constructor(props: ILoadingProps) {
    super(props);
    this.state = {
      visible: false,
      text: '',
    };
  }

  componentDidMount() {
    this.emitter = new EmitterHelper({
      [FETCHSTART]: (data) => {
        this.props.dispatch(createAction(FETCHSTART)({ loading: true }));
        this.setState({
          visible: true,
          text: data.text,
        });
      },
      [FETCHEND]: (data) => {
        this.props.dispatch(createAction(FETCHEND)({ loading: false }));
        this.setState({
          visible: false,
          text: '',
        });
      },
    });
  }

  componentWillUnmount() {
    this.emitter.remove();
  }

  render() {
    if (!this.props.visible && !this.state.visible) {
      return <View />;
    }
    return (
      <View style={[defaultStyles.center, styles.modal]}>
        <View style={[defaultStyles.center, styles.loading]}>
          <Spinkit type={'Circle'} color={white} size={px2dp(70)} />
          <Text style={styles.text}>{this.state.text || 'loading...'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    zIndex: 999,
  },
  loading: {
    width: px2dp(300),
    height: px2dp(200),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: px2dp(20),
  },
  text: {
    fontSize: px2dp(30),
    color: white,
    marginTop: px2dp(40),
    marginLeft: px2dp(20),
  },
});

export default connect()(Loading);
