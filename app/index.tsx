/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, StatusBar } from 'react-native';
// 引入react-redux
import { Provider } from 'react-redux';
// 引入store文件
import { store } from './store';
import { Loading, CodePushModal, Toast, Popup } from './components';
import AppWithNavigation from './AppWithNavigation';
import CodePush, { DownloadProgress } from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';

const _dev = __DEV__;

declare const global: any;
if (!_dev) {
  // 去掉console
  global.console = {
    log: () => {},
    info: () => {},
    error: () => {},
    warn: () => {},
    group: () => {},
    groupEnd: () => {},
    groupCollapsed: () => {},
  };
}

const codePushOptions = {
  // 设置检查更新的频率
  // ON_APP_RESUME APP恢复到前台的时候
  // ON_APP_START APP开启的时候
  // MANUAL 手动检查
  checkFrequency : CodePush.CheckFrequency.MANUAL,
};

interface IAppProps {}
interface IAppState {
  modalVisible: boolean; // codepush弹窗隐藏/显示
  isMandatory: boolean;  // codepush是否强更
  progress: number;      // codepush下载进度
  initialized: boolean;
}

const initialProgress = 0.1;

class App extends Component<IAppProps, IAppState> {
  description: string;   // codepush更新文案
  timer1: NodeJS.Timer;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      initialized: true,
      modalVisible: false,
      isMandatory: false,
      progress: initialProgress,
    };
  }

  componentWillMount() {
    if (!_dev) {
      this._codepushCheckVersion();
    }
  }

  async componentDidMount() {
    CodePush.allowRestart(); // 加载完了，允许重启
    // CodePush.disallowRestart();
    this.timer1 = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  componentWillUnmount() {
    if (this.timer1) {
      clearTimeout(this.timer1);
    }
  }

  _codepushCheckVersion() {
    CodePush.checkForUpdate().then((info) => {
      console.log(`~~~~~~~~~~~~~codepush检查更新`, JSON.stringify(info));
      if (info && Object.keys(info).length > 0) {
        const { description = '', isMandatory = false } = info;
        this.description = description;
        this.setState({ modalVisible: true, isMandatory: isMandatory });
      }
    });
  }
  _codepushStatus(status: CodePush.SyncStatus) {
    let syncMessage = '';
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        syncMessage = '检查更新';
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        syncMessage = '下载中';
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        syncMessage = '等待用户动作';
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        syncMessage = '升级中';
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        syncMessage = 'App已是最新';
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        syncMessage = '用户取消更新';
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        syncMessage = '已安装更新包, 准备重启';
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        syncMessage = '未知错误状态';
        this.setState({ modalVisible: false, progress: 0 }, () => {
          console.log('更新出错，请关闭App后重新打开App！');
        });
        break;
    }
    console.log(`~~~~~~~~~~~~~codepushStatus: ${syncMessage}`);
  }
  _codepushDownload = (progress: DownloadProgress) => {
    const currProgress = Number(parseFloat(`${progress.receivedBytes / progress.totalBytes}`).toFixed(2));
    console.log('~~~~~~~~~~~~~下载', currProgress);
    if (currProgress >= 1.0) {
      this.setState({ modalVisible: false, progress: 0 });
      console.log('~~~~~~~~~~~~~下载完成');
    } else if (currProgress > initialProgress) {
      this.setState({ progress: currProgress });
    }
  }
  _codepushOkOnPress = () => {
    // 检查更新、下载、安装均在此方法(更新的参数、更新状态改变的回调、下载进度的回调、版本不一致的回调)
    CodePush.sync({
      installMode : CodePush.InstallMode.IMMEDIATE ,
      updateDialog : null,
    }, this._codepushStatus.bind(this), this._codepushDownload);
    // CodePush.sync({
    //   // 安装模式
    //   // ON_NEXT_RESUME 下次恢复到前台时
    //   // ON_NEXT_RESTART 下一次重启时
    //   // IMMEDIATE 马上更新
    //   installMode : CodePush.InstallMode.IMMEDIATE ,
    //   // 对话框
    //   updateDialog : {
    //     // 是否显示更新描述
    //     appendReleaseDescription : true ,
    //     // 更新描述的前缀。 默认为"Description"
    //     descriptionPrefix : '更新内容：' ,
    //     // 强制更新按钮文字，默认为continue
    //     mandatoryContinueButtonLabel : '立即更新' ,
    //     // 强制更新时的信息. 默认为"An update is available that must be installed."
    //     mandatoryUpdateMessage : '必须更新后才能使用' ,
    //     // 非强制更新时，按钮文字,默认为"ignore"
    //     optionalIgnoreButtonLabel : '稍后' ,
    //     // 非强制更新时，确认按钮文字. 默认为"Install"
    //     optionalInstallButtonLabel : '后台更新' ,
    //     // 非强制更新时，检查到更新的消息文本
    //     optionalUpdateMessage : '有新版本了，是否更新？' ,
    //     // Alert窗口的标题
    //     title : '更新提示',
    //   } ,
    // });
  }
  _codepushCancelOnPress = () => {
    this.setState({ modalVisible: false, progress: 0 });
  }
  render() {
    const { initialized, modalVisible, isMandatory, progress } = this.state;
    if (!initialized) {
      return <Provider store={store}><Loading visible /></Provider>;
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor={'transparent'}
            showHideTransition={'fade'}
            barStyle={'dark-content'}
          />
          <AppWithNavigation />
          <Loading />
          <Toast />
          <Popup />
          {_dev ? null :
          <CodePushModal
            modalVisible={modalVisible}
            isMandatory={isMandatory}
            progress={progress}
            okBtnOnPress={this._codepushOkOnPress}
            cancelBtnOnPress={this._codepushCancelOnPress}
            alertDes={this.description}
          />
          }
        </View>
      </Provider>
    );
  }
}

export default _dev ? App : CodePush(codePushOptions)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
});
