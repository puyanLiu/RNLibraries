import React, { Component } from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import ScrollableButton from './buttons/ScrollableButton';
import { fontColor, fontColor_66, borderColor, lineWidth } from 'rn-styles/';

const WINDOW_WIDTH = Dimensions.get('window').width;

interface IProps {
  goToPage?: () => void;
  activeTab?: number;
  tabs?: [];
  backgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  scrollOffset?: number;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  tabsContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  renderTab?: () => void;
  underlineStyle?: StyleProp<ViewStyle>;
  underlineWidth?: number;
  onScroll?: () => void;
  scrollValue?: any;
}

interface IState {
  _containerWidth: number;
  _leftTabUnderline: Animated.Value;
  _widthTabUnderline: Animated.Value;
}

class ScrollableTabBar extends Component<IProps, IState> {

  static defaultProps = {
    scrollOffset: 52,
    activeTextColor: fontColor,
    inactiveTextColor: fontColor_66,
    style: {},
    tabStyle: {},
    tabsContainerStyle: {},
    underlineStyle: {},
  };

  _tabsMeasurements: any[];
  _containerMeasurements: any;
  _tabContainerMeasurements: any;
  _scrollView: any;
  _tabContainer: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
    };
    this._tabsMeasurements = [];
    this.renderTab = this.renderTab.bind(this);
    this.onTabContainerLayout = this.onTabContainerLayout.bind(this);
    this.onContainerLayout = this.onContainerLayout.bind(this);
    this.measureTab = this.measureTab.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  }

  componentWillReceiveProps(nextProps: IProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) && this.state._containerWidth) {
      this.setState({ _containerWidth: null });
    }
  }

  updateView(offset: { value: number; }) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }

    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  }

  necessarilyMeasurementsCompleted(position: number, isLastTab: boolean) {
    return this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements;
  }

  updateTabPanel(position: number, pageOffset: number) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false });
    }
  }

  updateTabUnderline(position: number, pageOffset: number, tabCount: number) {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;

    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
      const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);
      if (this.props && this.props.underlineWidth) {
        this.state._widthTabUnderline.setValue(this.props.underlineWidth);
        this.state._leftTabUnderline.setValue(newLineLeft
          + (newLineRight - newLineLeft - this.props.underlineWidth) * 0.5);
      } else {
        this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
        this.state._leftTabUnderline.setValue(newLineLeft);
      }
    } else {
      if (this.props && this.props.underlineWidth) {
        this.state._widthTabUnderline.setValue(this.props.underlineWidth);
        this.state._leftTabUnderline.setValue(lineLeft + (lineRight - lineLeft - this.props.underlineWidth) * 0.5);
      } else {
        this.state._widthTabUnderline.setValue(lineRight - lineLeft);
        this.state._leftTabUnderline.setValue(lineLeft);
      }
    }
  }

  renderTab(name: string, page: any, isTabActive: any,
            onPressHandler: (arg0: any) => void, onLayoutHandler: any) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <ScrollableButton
        key={`${name}_${page}`}
        accessible
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={[styles.tab, this.props.tabStyle ]}>
          <Text style={[{color: textColor, fontWeight }, textStyle ]}>
            {name}
          </Text>
        </View>
      </ScrollableButton>
    );
  }

  onTabContainerLayout(e: { nativeEvent: { layout: any; }; }) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({ _containerWidth: width });
    this.updateView({value: this.props.scrollValue.__getValue() });
  }

  onContainerLayout(e: { nativeEvent: { layout: any; }; }) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({value: this.props.scrollValue.__getValue() });
  }

  measureTab(page: number, event: { nativeEvent: { layout: { x: any; width: any; height: any; }; }; }) {
    const { x, width, height } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = {left: x, right: x + width, width, height };
    this.updateView({value: this.props.scrollValue.__getValue() });
  }

  render() {
    const tabUnderlineStyle = {
      position: 'absolute',
      height: 3,
      backgroundColor: fontColor,
      bottom: 0,
    };

    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline,
    };
    return (
      <View
        style={[styles.container, {backgroundColor: this.props.backgroundColor }, this.props.style ]}
        onLayout={this.onContainerLayout}
      >
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled
          bounces={false}
          scrollsToTop={false}
        >
          <View
            style={[styles.tabs, {width: this.state._containerWidth }, this.props.tabsContainerStyle ]}
            ref={ref => this._tabContainer = ref}
            onLayout={this.onTabContainerLayout}
          >
            {this.props.tabs.map((name, page) => {
              const isTabActive = this.props.activeTab === page;
              const renderTab = this.props.renderTab || this.renderTab;
              return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
            })}
            <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle ]} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    height: 50,
    borderWidth: lineWidth,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: borderColor,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ScrollableTabBar;
