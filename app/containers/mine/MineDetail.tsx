import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MineDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Mine Detail!</Text>
      </View>
    );
  }
}

export default MineDetail;
