import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
} from 'react-native';
import { white, fontColor, fontColor_66 } from 'rn-styles';
import { Button } from './buttons';
import { EmitterHelper, INormalProps, IPopupConfig } from 'rn-utils';
import { POPUPSHOW, POPUPHIDE } from '../model/actionTypes';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';

interface IPopupProps extends INormalProps {
}

interface IPopupState extends IPopupConfig {
  visible: boolean;
}

const PADDING = px2dp(40);
const initState: IPopupState = {
  style: null,
  title: null,
  content: null,
  okBtn: {
    text: '确定',
  },
  cancelBtn: {
    text: '取消',
  },
  children: null,
  autoCloseBtn: true,
  visible: false,
};

class Popup extends Component<IPopupProps, IPopupState> {
  emitter: EmitterHelper;

  constructor(props: IPopupProps) {
    super(props);
    this.state = initState;
  }

  componentDidMount() {
    this.emitter = new EmitterHelper({
      [POPUPSHOW]: (data) => {
        this.props.dispatch(createAction(POPUPSHOW)({ pupupshow: true }));
        this.setState({
          ...data,
          visible: true,
        });
      },
      [POPUPHIDE]: (data) => {
        this.props.dispatch(createAction(POPUPHIDE)({ pupupshow: false }));
        this.setState(initState);
      },
    });
  }

  componentWillUnmount() {
    this.emitter.remove();
  }

  _close = () => {
    this.setState(initState);
  }

  _okOnPress = () => {
    const { okBtn, autoCloseBtn } = this.state;
    if (okBtn && okBtn.onPress && okBtn.onPress instanceof Function) {
      okBtn.onPress();
    }
    if (autoCloseBtn) {
      this._close();
    }
  }

  _cancelOnPress = () => {
    const { cancelBtn, autoCloseBtn } = this.state;
    if (cancelBtn && cancelBtn.onPress && cancelBtn.onPress instanceof Function) {
      cancelBtn.onPress();
    }
    if (autoCloseBtn) {
      this._close();
    }
  }

  _renderButton() {
    const {
      okBtn,
      cancelBtn,
    } = this.state;
    return (
      <View style={{ flexDirection: 'row', marginTop: PADDING }}>
      {
        cancelBtn ? <Button
          onPress={this._okOnPress}
          title={cancelBtn.text}
          style={[styles.btn, { marginRight: PADDING }, cancelBtn.style]}
          backgroundColor={fontColor_66}
          titleStyle={cancelBtn.textStyle}
        /> : null
      }
      {
        okBtn ? <Button
          onPress={this._cancelOnPress}
          title={okBtn.text}
          style={[styles.btn, okBtn.style]}
          titleStyle={okBtn.textStyle}
        /> : null
      }
      </View>
    );
  }

  _renderTitle() {
    const { title } = this.state;
    if (title) {
      if (typeof title === 'string') {
        return (<Text style={[styles.title]} numberOfLines={1}>{title}</Text>);
      } else {
        return <Text style={[styles.title, title.style]} numberOfLines={1}>{title.text}</Text>;
      }
    } else {
      return null;
    }
  }

  _renderContent() {
    const { content } = this.state;
    if (content) {
      if (typeof content === 'string') {
        return <Text style={[styles.des]}>{content}</Text>;
      } else if (Array.isArray(content)) {
        const texts = content.map((item, index) => (
          <Text key={index} style={[styles.des]}>{item}</Text>
        ));
        return texts;
      } else if (typeof content === 'object' && typeof content.text === 'string') {
        return <Text style={[styles.des, content.style]}>{content.text}</Text>;
      } else if (typeof content === 'object' && Array.isArray(content.text)) {
        const texts = content.text.map((item, index) => (
          <Text key={index} style={[styles.des, content.style]}>{item}</Text>
        ));
        return texts;
      }
    } else {
      return null;
    }
  }

  _renderAlert() {
    const {
      style,
      children,
    } = this.state;
    return (
    <View style={[styles.alert, style]}>
       {this._renderTitle()}
       {this._renderContent()}
       {children}
       {this._renderButton()}
    </View>
    );
  }

  render() {
    const { style } = this.state;
    return (
      <Modal animationType={'fade'} transparent visible={this.state.visible} onRequestClose={() => {}}>
        <View style={[styles.container, style]}>
          {this._renderAlert()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   paddingHorizontal: PADDING,
   backgroundColor: 'rgba(0,0,0,0.3)',
   flex: 1,
   justifyContent: 'center',
  },
  alert: {
    paddingHorizontal: PADDING,
    paddingVertical: PADDING,
    backgroundColor: white,
    alignItems: 'center',
    borderRadius: px2dp(20),
  },
  title: {
    fontWeight: 'bold',
    fontSize: px2dp(36),
    color: fontColor,
  },
  des: {
    lineHeight: px2dp(40),
    fontSize: px2dp(30),
    color: fontColor_66,
    marginTop: PADDING,
  },
  btn: {
    flex: 1,
    height: px2dp(90),
    borderRadius: px2dp(45),
  },
});

export default connect()(Popup);
