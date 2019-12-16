import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { INormalComponentProps, navigationHelper } from 'rn-utils';
import { Button } from 'rn-components';
import { segWidth } from 'rn-styles';

interface IProps extends INormalComponentProps  {
}

function Index(props: IProps) {
  console.log(props);
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Button style={{marginTop: segWidth}} title={'push login'} onPress={() => {
        navigationHelper.navigate('login');
      }} />
      <Button style={{marginTop: segWidth}} title={'装饰器'} onPress={() => {
        navigation.push('decorateDemo');
      }} />
      <Button style={{marginTop: segWidth}} title={'跳转'} onPress={() => {
        navigation.push('jumpDemo');
      }} />
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
