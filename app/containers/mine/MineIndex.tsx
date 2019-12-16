import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class MineIndex extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Mine Index!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: px2dp(120),
  },
});

export default MineIndex;
