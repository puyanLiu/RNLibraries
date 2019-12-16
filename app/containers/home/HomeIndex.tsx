import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { INormalComponentProps } from 'rn-utils';

interface IProps extends INormalComponentProps  {
}

function HomeIndex(props: IProps) {
  const { navigation } = props;
  useEffect(() => {
    navigation.push('demo');
    return () => {
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Home Index!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: px2dp(120),
    paddingHorizontal: px2dp(40),
  },
});

export default HomeIndex;
