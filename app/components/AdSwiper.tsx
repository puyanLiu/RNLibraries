import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import defaultStyles, { fontColor_e5, yellow, width as defaultWidth } from 'rn-styles';

export interface IAd {
  image?: string;
  url?: string;
}

interface IProps {
  adList?: IAd[];
  height?: number;
  width?: number;
  swiperStyle?: ViewStyle;
  itemStyle?: StyleProp<ImageStyle>;
  onPress?: (item: IAd) => void;
}

const AdSwiper = (props: IProps) => {
  const {
    height = px2dp(280),
    width = defaultWidth,
    adList = [],
    swiperStyle,
    itemStyle,
    onPress,
  } = props;
  if (adList.length === 0) {
    return null;
  }
  return (
    <View style={{ height, width }}>
      <Swiper
        key={'adSwiper'}
        height={height}
        width={width}
        autoplay
        autoplayTimeout={5}
        removeClippedSubviews={false}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        style={swiperStyle}
      >
        {
          adList.map((item: any, index: any) => (
            <AdListItem
              key={index}
              image={item.image}
              height={height}
              width={width}
              style={itemStyle}
              onPress={() => { onPress(item); }}
            />
          ))
        }
      </Swiper>
    </View>
  );
};

interface IItemProps {
  image: string;
  height: number;
  width: number;
  onPress: () => void;
  style: StyleProp<ImageStyle>;
}

const AdListItem = ({ image, height, width, onPress, style }: IItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={defaultStyles.center}>
      <Image
        source={{ uri: image }}
        style={[{ width, height }, style]}
        resizeMode={'stretch'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paginationStyle: {
    justifyContent: 'flex-end',
    marginRight: px2dp(30),
    marginBottom: px2dp(-30),
  },
  dotStyle: {
    backgroundColor: fontColor_e5,
    width: px2dp(12),
    height: px2dp(12),
    borderRadius: px2dp(8),
  },
  activeDotStyle: {
    backgroundColor: yellow,
    width: px2dp(12),
    height: px2dp(12),
    borderRadius: px2dp(8),
  },
});

export default AdSwiper;
