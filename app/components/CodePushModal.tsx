import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Modal,
} from 'react-native';
import { width, theme, white, fontColor, fontColor_66 } from 'rn-styles';
import ProgressBar, { IProgressBarProps } from './ProgressBar';
import { Button } from './buttons';

export interface ICodePushModalProps extends IProgressBarProps {
  /** 组件样式 */
  style?: StyleProp<ViewStyle>;
  /** 弹窗样式 */
  alertStyle?: StyleProp<ViewStyle>;
  /** 弹窗标题样式 */
  alertTitleStyle?: StyleProp<TextStyle>;
  /** 弹窗标题, 默认是 更新提示 */
  alertTitle?: string;
  /** 弹窗内容样式 */
  alertDesStyle?: StyleProp<TextStyle>;
  /** 弹窗内容, 默认是 有重要内容需要立即更新! */
  alertDes?: string;
  /** 弹窗下载中提示文字样式 */
  downloadingDesStyle?: StyleProp<TextStyle>;
  /** 弹窗下载中提示文字, 默认是 极速更新中，请稍等... */
  downloadingDes?: string;
  /** 右边按钮样式 */
  okBtnStyle?: StyleProp<ViewStyle>;
  /** 左边按钮样式 */
  cancelBtnStyle?: StyleProp<ViewStyle>;
  /** 右边按钮文字样式 */
  okBtnTextStyle?: StyleProp<TextStyle>;
  /** 左边按钮文字样式 */
  cancelBtnTextStyle?: StyleProp<TextStyle>;
  /** 右边按钮文字, 默认 立即更新 */
  okBtnText?: string;
  /** 左边按钮文字, 默认 下次再说 */
  cancelBtnText?: string;
  /** 右边按钮点击回调 */
  okBtnOnPress?: (e?: any) => void;
  /** 左边边按钮点击回调 */
  cancelBtnOnPress?: (e?: any) => void;
  /** 是否强制更新, 默认false */
  isMandatory: boolean;
  /** 弹窗是否显示, 默认false */
  modalVisible: boolean;
}

interface ICodePushModalState {
  immediateUpdate: boolean;
}

const PADDING = px2dp(40);

class CodePushModal extends Component<ICodePushModalProps, ICodePushModalState> {
  static defaultProps = {
    buttonColor: theme,
    buttonTextColor: white,
    alertTitle: '更新提示',
    alertDes: '有重要内容需要立即更新!',
    downloadingDes: '极速更新中，请稍等...',
    okBtnText: '立即更新',
    cancelBtnText: '下次再说',
    isMandatory: false,
    modalVisible: false,
  };

  constructor(props: ICodePushModalProps) {
    super(props);
    this.state = {
      immediateUpdate: false,  // 是否是更新中
    };
  }

  _renderButton() {
    const {
      cancelBtnStyle,
      cancelBtnTextStyle,
      cancelBtnText,
      okBtnStyle,
      okBtnTextStyle,
      okBtnText,
      isMandatory,
      okBtnOnPress,
      cancelBtnOnPress,
    } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        { isMandatory ? null :
        <Button
          onPress={cancelBtnOnPress}
          title={cancelBtnText}
          style={[styles.btn, { marginRight: PADDING }, cancelBtnStyle]}
          backgroundColor={fontColor_66}
          titleStyle={cancelBtnTextStyle}
        />}
        <Button
          onPress={() => { this.setState({ immediateUpdate: true }); if (okBtnOnPress) okBtnOnPress(); }}
          title={okBtnText}
          style={[styles.btn, okBtnStyle]}
          titleStyle={okBtnTextStyle}
        />
      </View>
    );
  }

  _renderAlert() {
    const {
      alertStyle,
      alertTitleStyle,
      alertTitle,
      alertDesStyle,
      alertDes,
      downloadingDesStyle,
      downloadingDes,
      progress,
      progressColor,
      progressBgColor,
      progressAniDuration,
      progressStyle,
    } = this.props;
    return (
    <View style={[styles.alert, alertStyle]}>
       <Text style={[styles.title, alertTitleStyle]} numberOfLines={1}>{alertTitle}</Text>
       <Text style={[styles.des, alertDesStyle]}>{alertDes}</Text>
       {
         this.state.immediateUpdate ? <View style={styles.downloadContainer}>
           <ProgressBar
              progress={progress}
              progressColor={progressColor}
              progressBgColor={progressBgColor}
              progressAniDuration={progressAniDuration}
              progressStyle={[{ width: width - (4 * PADDING + px2dp(20)) }, progressStyle]}
           />
           <Text style={[styles.loadingStr, downloadingDesStyle]}>{downloadingDes}</Text>
         </View> : this._renderButton()
       }
    </View>
    );
  }

  render() {
    const { style, modalVisible } = this.props;
    return (
      <Modal animationType={'fade'} transparent visible={modalVisible} onRequestClose={() => {}}>
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
    marginBottom: PADDING,
  },
  des: {
    lineHeight: px2dp(40),
    fontSize: px2dp(30),
    color: fontColor_66,
    marginBottom: PADDING,
  },
  btn: {
    flex: 1,
    height: px2dp(90),
    borderRadius: px2dp(45),
  },
  loadingStr: {
    fontSize: px2dp(24),
    marginTop: px2dp(20),
    color: fontColor_66,
  },
  downloadContainer: {
    minHeight: px2dp(90),
    alignItems: 'center',
    justifyContent: 'flex-end',
  } as ViewStyle,
});

export default CodePushModal;
