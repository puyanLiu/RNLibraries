import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class BillDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bill Detail!</Text>
      </View>
    );
  }
}

export default BillDetail;
