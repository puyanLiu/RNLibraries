import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { INormalComponentProps, navigationHelper, backHelper } from 'rn-utils';
import { Button } from 'rn-components';
import { segWidth } from 'rn-styles';

interface IProps extends INormalComponentProps  {
}

function Index(props: IProps) {
  const { navigation } = props;

  const _changeTitle = () => {
    navigation.setParams({title: '更改标题方式一'});

    navigationHelper.setParams({
      title: '更改标题方式二',
    });
  };

  backHelper.backHandle(() => {
    console.log('jumpDemo自定义事件');
    navigation.pop();
  });

  const _jumpNavigateDetail = () => {
    navigationHelper.navigate('homeDetail');
  };

  const _jumpPushDetail = () => {
    navigationHelper.push('homeDetail');
  };

  return (
    <View style={styles.container}>
      <Button title={'更改导航条标题'} style={{marginTop: segWidth}} onPress={_changeTitle} />
      <Button title={'navigate到Detail'} style={{marginTop: segWidth}} onPress={_jumpNavigateDetail} />
      <Button title={'push到Detail'} style={{marginTop: segWidth}} onPress={_jumpPushDetail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: px2dp(20),
    paddingHorizontal: px2dp(40),
  },
});

export default Index;
