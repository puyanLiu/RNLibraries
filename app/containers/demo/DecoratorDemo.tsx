import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { INormalComponentProps, normalConnect } from 'rn-utils';

interface IProps extends INormalComponentProps  {
}

interface IState {
}

// @normalConnect({
//   reducers: ['userToken']
// })
@normalConnect()
class DecoratorDemo extends Component<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <Text>此文件是DecoratorDemo!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DecoratorDemo;
// export default normalConnect()(HomeIndex);

// const mapStateToProps = (state: any) => {
//   console.log('home返回', state);
//   return {
//     userToken: state.userToken,
//   };
// };
// export default connect(mapStateToProps)(HomeIndex);
