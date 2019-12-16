import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

/**
 * 判断是否IOS平台
 */
const isIOS = Platform.OS === 'ios';
/**
 * 判断是否Android平台
 */
const isAndroid = Platform.OS === 'android';
/**
 * 判断是否iPhoneX  X和XS  375*812
 */
const isIPhoneX: boolean = isIOS && window.width === 375 && window.height === 812;
/**
 * 判断是否iPhoneXR  XS_Max和XR 414*896
 */
const isIPhoneXR: boolean = isIOS && window.width === 414 && window.height === 896;
/**
 * 判断是否Android5.x平台
 */
const isAndroid5: boolean = isAndroid && Platform.Version > 20 && Platform.Version < 23;
/**
 * 判断是否Android5.0以上平台
 */
const overAndroid5: boolean = isAndroid && Platform.Version > 19;
/**
 * 转换颜色为RGBA格式
 * @param {string} color 颜色值
 * @param {number} opacity 透明度
 * @returns {string}
 */
function convertToRGBA(color: string, opacity: number): string {
  let result = '';
  if (color.indexOf('#') === 0) {
    const _color = color.replace('#', '');
    const r = parseInt(_color.substring(0, 2), 16);
    const g = parseInt(_color.substring(2, 4), 16);
    const b = parseInt(_color.substring(4, 6), 16);
    result = `rgba(${r},${g},${b},${opacity})`;
  } else if (color.indexOf('rgb') === 0 && color.indexOf('rgba') === -1) {
    result = `rgba${color.slice(3, -1)},${opacity})`;
  } else if (color.indexOf('rgba') === 0) {
    const index = color.lastIndexOf(',');
    result = `${color.slice(0, index)},${opacity})`;
  }
  return result;
}

declare global {
  function px2dp(px: number): number;
}

declare const global: any;
/**
 * 根据750px的设计稿比例转换成dp
 * global.px2dp === global['px2dp']
 */
global.px2dp = (px: number) => (px / 750) * window.width;

export {
  isIOS,
  isAndroid,
  isIPhoneX,
  isIPhoneXR,
  isAndroid5,
  overAndroid5,
  convertToRGBA };
