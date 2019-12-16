import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { IFormComponentProps, formConnect, navigationHelper } from 'rn-utils';
import { Protocol, Button, TitleButton, CircleButton, Line, Input, CaptchaInput, Header } from 'rn-components';
import defaultStyles, { segWidth, theme, isAndroid } from 'rn-styles';
import leftImage from '../../assets/image/placeholderImage.jpg';
import { protocolActions, protocolType } from '../../model/protocol';

interface IProps extends IFormComponentProps  {
}

interface IState {
  areaCode: string;
}

@formConnect({
  config: {
    form: 'login',
    fields: ['phone', 'captcha'],
    validate(fields: any) {
      const errors: any = [];
      if (!fields.phone) {
        errors.phone = '请输入手机号';
      } else if (!fields.captcha) {
        errors.captcha = '请输入验证码';
      }
      return errors;
    },
  },
})
class Login extends Component<IProps, IState> {
  _phoneInputWrapper: any;
  _captchaInputWrapper: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      areaCode: '+86',
    };
  }

  componentDidMount() {
    // let phoneInput = this._phoneInput();
    // if (phoneInput) {
    //   phoneInput.focus();
    // }
  }

  _submit = (data: any, dispatch: any) => {
    console.log('submit', data);
  }

  _onAreaCode = () => {
  }

  _phoneInput = () => {
    return this._phoneInputWrapper.ins.getRenderedComponent();
  }

  _captchaInput = () => {
    return this._captchaInputWrapper.ins.getRenderedComponent();
  }

  _onHandlePhoneSubmitEditing = () => {
    this._captchaInput().focus();
  }

  _onProtocolClick = () => {
    this.props.dispatch(
      protocolActions.getProtocol({
        params: {
          protocolType: protocolType.login,
        },
      }),
    );
  }

  _close = () => {
    navigationHelper.pop();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <Header leftIconName={'public_close'} leftOnPress={this._close}  />
        <ScrollView
          keyboardDismissMode={isAndroid ? 'none' : 'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          >
          <Text style={styles.text1}>短信验证码登录/注册</Text>
          <Protocol promptText="登录注册表示同意" text="使用协议、隐私政策" promptTextStyle={{marginRight: px2dp(10)}}
          onPress={this._onProtocolClick} />
          <View style={[defaultStyles.border, styles.inputContainer]}>
            <View style={[defaultStyles.alignItemsCenterRow, styles.telContainer]}>
              <TitleButton title={this.state.areaCode} titleStyle={{ fontWeight: 'bold' }} onPress={this._onAreaCode} />
              <Line direction={'column'} style={{ height: px2dp(50) }} />
              <Input
                name={'phone'}
                type={'phone'}
                placeholder={'请输入您的手机号码'}
                initValue={this.props.fieldsValue.phone}
                ref={(ref: any) => this._phoneInputWrapper = ref}
                onSubmitEditing={this._onHandlePhoneSubmitEditing}
              />
            </View>
            <Line />
            <CaptchaInput
              name={'captcha'}
              placeholder={'验证码'}
              style={styles.telContainer}
              getInputRef={(ref: any) => this._captchaInputWrapper = ref}
              onPress={() => {}}
            />
          </View>
          <Button title="登录" onPress={handleSubmit(this._submit)} />
          <View style={styles.otherLoginContainer}>
            <TitleButton title={'账号密码登录'} titleColor={theme} onPress={() => {}} />
            <TitleButton title={'收不到验证码？'} onPress={() => {}} />
          </View>
          <Text style={[defaultStyles.font_26, styles.threeLogin]}>第三方登录</Text>
          <View style={[defaultStyles.centerRow]}>
            <CircleButton source={leftImage} style={{ marginRight: px2dp(80) }} />
            <CircleButton source={leftImage} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: px2dp(260),
    paddingBottom: px2dp(50),
    paddingHorizontal: segWidth,
  },
  text1: {
    fontSize: px2dp(50),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: px2dp(50),
  },
  telContainer: {
    height: px2dp(100),
  },
  otherLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px2dp(40),
  },
  threeLogin: {
    alignSelf: 'center',
    marginTop: px2dp(150),
    marginBottom: px2dp(60),
  },
});

export default Login;

// export default connect()(reduxForm({
//   form: 'login',
//   onSubmitFail: (errors) => {
//     console.log('errors~~~~~~', errors);
//   },
//   validate: (fields: any) => {
//     console.log('values~~~~~~~~', fields);
//     let errors: any = {};
//     if (!fields.phone || fields.phone.length !== 11) {
//       errors.phone = '请输入11位手机号';
//     }
//     return errors;
//   },
// })(Login));
