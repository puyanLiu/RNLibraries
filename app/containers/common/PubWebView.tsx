import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Linking,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import { INormalComponentProps, normalConnect, mappedNavigationParams, navigationHelper, backHelper,
  patchJSCode, EmitterHelper } from 'rn-utils';
import { TitleButton, HeaderLeftTwoBtn } from 'rn-components';
import defaultStyles, { fontColor, fontColor_99, tabbarHeight, iPhoneXBottom, width,
  isAndroid, isIOS } from 'rn-styles';
import { WebView } from 'react-native-webview';
import { createAction } from 'redux-actions';
import { WEBVIEWBACK } from '../../model';

interface IParams {
  isShowToolbar: boolean;
  uri: string;
  html: string;
  title: string;
  backHandle?: () => void;
}

interface IMessage {
  type: 'push' | 'navigate' | 'pop' | 'popToTop' | 'dispatch';
  data?: {
    routeName?: string;
    actionName?: string;
    params?: any;
  };
}

interface IProps extends INormalComponentProps, IParams  {
}

interface IState {
  backEnabled: boolean;
  forwardEnabled: boolean;
}

@normalConnect()
@mappedNavigationParams()
class PubWebView extends Component<IProps, IState> {
  _webView: any;
  _emitter: any;
  _isDownloading: boolean = false;

  static defaultProps = {
    isShowToolbar: true,
  };

  static navigationOptions = ({ navigation, backHandle }: IProps) => {
    const title = navigation.getParam('title') || '';
    const icon1OnPress = () => {
      DeviceEventEmitter.emit(WEBVIEWBACK);
    };
    const icon2OnPress = backHandle || (() => navigationHelper.back());
    return {
      title: title,
      headerLeft: <HeaderLeftTwoBtn icon1OnPress={icon1OnPress} icon2OnPress={icon2OnPress} />,
    };
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      backEnabled: false,
      forwardEnabled: false,
    };
    // 自定义返回按键
    backHelper.backHandle(this._back);
  }

  componentDidMount() {
    this._emitter = new EmitterHelper({
      [WEBVIEWBACK]: (data) => {
        this._back();
      },
    });
  }

  componentWillUnmount() {
    this._emitter.remove();
  }

  _back = () => {
    if (this._webView && this.state.backEnabled) {
      this._goBack();
    } else {
      if (this.props.backHandle) {
        this.props.backHandle();
      } else {
        navigationHelper.back();
      }
    }
  }

  _goBack = () => {
    this._webView.goBack();
  }
  _goForward = () => {
    this._webView.goForward();
  }
  _reload = () => {
    this._webView.reload();
  }
  _safari = () => {
    Linking.canOpenURL(this.props.uri).then((supported) => {
      if (supported) {
        return Linking.openURL(this.props.uri)
        .catch((error) => {
          console.log('发生错误：', error);
        });
      }
    });
  }

  _renderToolbar() {
    if (!this.props.isShowToolbar) {
      return null;
    }
    const iconSize = px2dp(40);
    const arr = [
      {
        onPress: this._goBack,
        icon: 'arrow_left',
        color: this.state.backEnabled ? fontColor : fontColor_99,
      },
      {
        onPress: this._goForward,
        icon: 'arrow_right',
        color: this.state.forwardEnabled ? fontColor : fontColor_99,
      },
      {
        onPress: this._reload,
        icon: 'refrash',
        color: fontColor,
      },
      {
        onPress: this._safari,
        icon: 'safari',
        color: fontColor,
      },
    ];
    return (
      <View style={[defaultStyles.borderTop, styles.toolbar]}>
        {
          arr.map((item, index) => (
            <TitleButton key={index} iconName={item.icon} iconSize={iconSize} iconColor={item.color}
            onPress={item.onPress}  style={styles.item} />
          ))
        }
      </View>
    );
  }

  _handleDownload = (url: string) => {
    if (!this._isDownloading) {
      const isApk = url.startsWith('http') && url.endsWith('.apk');
      const isIpa = (url.startsWith('http') && url.endsWith('.ipa'))
      || url.startsWith('itms-apps://') || url.startsWith('itms-services://');
      if ((isAndroid && isApk) || (isIOS && isIpa)) {
        this._isDownloading = true;
        // 使用浏览器打开
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url)
            .catch((error) => {
              console.log('发生错误：', error);
            });
          }
        });
      }
    }
  }
  _onNavigationStateChange = (e: any) => {
    if (this.props.title !== e.title) {
      navigationHelper.setParams({
        title: e.title,
      });
    }
    this._handleDownload(e.url);
    if (!(this.state.backEnabled === e.canGoBack && this.state.forwardEnabled === e.cangoForward)) {
      this.setState({
        backEnabled: e.canGoBack,
        forwardEnabled: e.cangoForward,
      });
    }
  }

  _onMessage = (e: { nativeEvent: { data: any; }; }) => {
    console.log(e.nativeEvent.data);
    try {
      const message: IMessage = JSON.parse(e.nativeEvent.data);
      if (typeof message === 'object' && message.type) {
        const { type, data = {} } = message;
        switch (type) {
          case 'navigate':
            if (data.routeName) {
              navigationHelper.navigate(data.routeName);
            }
            break;
          case 'push':
            if (data.routeName) {
              navigationHelper.push(data.routeName);
            }
            break;
          case 'pop':
            const n = data.params && typeof data.params === 'number' ? data.params : 1;
            navigationHelper.pop(n);
            break;
          case 'popToTop':
            if (data.routeName) {
              navigationHelper.back(data.routeName);
            } else {
              navigationHelper.popToTop();
            }
            break;
          case 'dispatch':
            if (data.actionName) {
              const params = data.params && typeof data.params === 'object' ? data.params : {};
              this.props.dispatch(createAction(data.actionName)(params));
            }
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const source = {} as any;
    const { uri, html } = this.props;
    if (uri) {
      source.uri = uri;
    } else if (html) {
      source.html = html;
    }
    let script;
    if (this.props.userToken) {
      // 注入userToken
      script = `sessionStorage.setItem("userToken",'${JSON.stringify(this.props.userToken)}');`;
    }
    return (
      <View style={defaultStyles.flex1}>
        <WebView
          ref={ref => this._webView = ref}
          style={defaultStyles.flex1}
          source={source}
          injectedJavaScript={patchJSCode(script)}
          onNavigationStateChange={this._onNavigationStateChange}
          onMessage={this._onMessage}
          startInLoadingState
          automaticallyAdjustContentInsets
          {...Platform.select({
            android: {
              javaScriptEnabled: true, // 控制是否启用 JavaScript
              domStorageEnabled: true, // 是否开启 DOM 本地存储
              scalesPageToFit: false, // 控制网页内容是否自动适配视图的大小，同时启用用户缩放
            },
          })}
        />
        {this._renderToolbar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    height: tabbarHeight + iPhoneXBottom,
    paddingBottom: iPhoneXBottom,
  },
  item: {
    width: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PubWebView;
