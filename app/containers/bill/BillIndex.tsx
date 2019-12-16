import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class BillIndex extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Bill Index!</Text>
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

export default BillIndex;
