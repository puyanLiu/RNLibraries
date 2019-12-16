import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { backHelper, INormalComponentProps, navigationHelper } from 'rn-utils';
import { Button } from 'rn-components';
import { segWidth } from 'rn-styles';

interface IProps extends INormalComponentProps  {
}

interface IState {
}

class HomeDetail extends Component<IProps, IState> {

  static navigationOptions = ({ navigation }: IProps) => {
    console.log('~~~~~~~~~~~');
    const title = navigation.getParam('title') || 'home 详情页';
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~`', title);
    return {
      title: title,
    };
  }

  _changeTitle = () => {
    const { navigation } = this.props;
    navigation.setParams({title: '更改标题方式一'});

    // navigationHelper.setParams({
    //   title: '更改标题方式二',
    // });
  }

  constructor(props: IProps) {
    super(props);
    // 自定义返回按键
    const { navigation } = this.props;
    backHelper.backHandle(() => {
      console.log('home detail页面自定义事件');
      navigation.pop();
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Detail</Text>
        <Button title={'更改导航条标题'} style={{marginTop: segWidth}} onPress={this._changeTitle} />
      </View>
    );
  }
}

export default HomeDetail;
