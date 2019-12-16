import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BottomTabBarProps } from 'react-navigation-tabs';
import defaultStyles, { black, tabbarHeight } from 'rn-styles';

interface ITabBarProps extends BottomTabBarProps {
  tabRoutes: any[];
}

interface ITabBarBottomOwnState {}

class TabBarBottom extends Component<ITabBarProps, ITabBarBottomOwnState> {
  constructor(props: ITabBarProps) {
    super(props);
    this.changeIndex = this.changeIndex.bind(this);
  }

  changeIndex(item: any) {
    console.log(item, this.props);
    this.props.jumpTo(item.routeName);
  }

  render() {
    const { navigation, tabRoutes } = this.props;
    const currentIndex = navigation.state.index || 0;
    return (
      <SafeAreaView style={[defaultStyles.borderTop, styles.tabView]}>
        {tabRoutes.map((item, index) => (
          <TouchableOpacity
            key={item.routeName}
            style={[defaultStyles.center, styles.item]}
            onPress={() => {
              this.changeIndex(item);
            }}
            activeOpacity={0.6}
          >
            <Image
              source={
                currentIndex === index ? item.activeIcon : item.inActiveIcon
              }
              style={styles.img}
            />
            <Text style={styles.text}>{item.tabName}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  item: {
    flex: 1,
    height: tabbarHeight,
  },
  text: {
    fontSize: px2dp(20),
    color: black,
    marginTop: px2dp(8),
  },
  img: {
    width: px2dp(44),
    height: px2dp(44),
  },
});

export default TabBarBottom;
