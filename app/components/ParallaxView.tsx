import React, { PureComponent } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
const screen = Dimensions.get('window');
import ScrollableMixin from 'react-native-scrollable-mixin';

interface IProps {
  windowHeight?: number;
  contentInset?: any;
  style?: StyleProp<ViewStyle>;
  scrollableViewStyle?: StyleProp<ViewStyle>;
  onScroll?: (e: any) => void;
  backgroundSource?: {};
  header?: any;
}

interface IState {
  onScroll: (e: any) => void;
  scrollY: Animated.Value;
}

class ParallaxView extends PureComponent<IProps, IState> {

  mixins: [ScrollableMixin];
  _scrollView: any;

  static defaultProps = {
    windowHeight: 300,
    contentInset: {
      top: screen.scale,
    },
  };

  constructor(props: IProps) {
    super(props);
    const scrollY = new Animated.Value(0);
    this.state = {
      scrollY,
      onScroll: Animated.event([
        { nativeEvent: { contentOffset: { y: scrollY } } },
      ]),
    };
  }

  /**
   * IMPORTANT: You must return the scroll responder of the underlying
   * scrollable component from getScrollResponder() when using ScrollableMixin.
   */
  getScrollResponder() {
    return this._scrollView.getScrollResponder();
  }

  setNativeProps(props: IProps) {
    this._scrollView.setNativeProps(props);
  }

  renderBackground() {
    const { windowHeight, backgroundSource } = this.props;
    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }
    return (
      <Animated.Image
        style={[
          styles.background,
          {
            height: windowHeight,
            transform: [{
              translateY: scrollY.interpolate({
                  inputRange: [ -windowHeight, 0, windowHeight],
                  outputRange: [windowHeight / 2, 0, -windowHeight / 2],
              }),
          }, {
              scale: scrollY.interpolate({
                  inputRange: [ -windowHeight, 0, windowHeight],
                  outputRange: [2, 1, 1],
              }),
          }],
          },
        ]}
        source={backgroundSource}
      />
    );
  }

  renderHeader() {
    const { windowHeight, backgroundSource, header } = this.props;
    const { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }
    return (
      <Animated.View
        style={{
          position: 'relative',
          height: windowHeight,
          // opacity: scrollY.interpolate({
          //   inputRange: [-windowHeight, 0, windowHeight / 1.2],
          //   outputRange: [1, 1, 0],
          // }),
        }}
      >
        {header}
      </Animated.View>
    );
  }

  render() {
    const { style } = this.props;
    const onScroll = this.props.onScroll
      ? (e: any) => {
          this.props.onScroll(e);
          this.state.onScroll(e);
        }
      : this.state.onScroll;
    return (
      <View style={[styles.container, style]}>
        {this.renderBackground()}
        <ScrollView
          ref={component => {
            this._scrollView = component;
          }}
          {...this.props}
          style={styles.scrollView}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {this.renderHeader()}
          <View style={[styles.content, this.props.scrollableViewStyle]}>
            {this.props.children}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    backgroundColor: '#2e2f31',
    width: screen.width,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default ParallaxView;
