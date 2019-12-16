import { NativeModules, Keyboard } from 'react-native';

/**
 * 分-->元(保留2位小数)
 * @param {(string | number)} num
 * @returns {string}
 */
function fen2yuan(num: string | number): string {
  const _num = Number(num);
  if (!_num || isNaN(_num)) {
    return '0.00';
  }
  return (_num / 100).toFixed(2);
}

/**
 * 保留2位小数
 * @param {(string | number)} num
 * @returns {string}
 */
function toFixed2(num: string | number): string {
  const _num = Number(num);
  if (!_num || isNaN(_num)) {
    return '0.00';
  }
  return _num.toFixed(2);
}

/**
 * 从字符串中获取number
 * getNumFromStr('10年') => 10
 * @param {*} str
 * @returns {number}
 */
function getNumFromStr(str: string): number {
  const tempStr = str.replace(/[^0-9]/g, '');
  let num = Number(tempStr);
  if (!num || isNaN(num)) {
    num = 0;
  }
  return num;
}

/**
 * 去除字符串空格
 * @param {string} str
 * @returns {string}
 */
function rmSpace(str: string): string {
  return str.replace(/\D/g, '');
}

/**
 * 检测string是否含有中文
 * @param {string} str
 * @returns {boolean}
 */
function checkChinese(str: string): boolean {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 检查数组是否为null或undefined
 * @param {any} num
 * @returns {number}
 */
function checkNumNull(num: any) {
  return num == null || num === undefined ? 0 : num;
}

/**
 * 判断是否空Object
 * @param obj Object
 */
function isEmptyObj(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * 转换格式
 * @param date string | Date
 */
function transformTime(date: string | Date) {
  let str = '';
  try {
    const start = new Date(date);
    const startTime = start.getTime();
    const nowTime = Date.now();
    const seconds = (nowTime - startTime) / 1000;
    if (seconds < 0) {
      str = '';
    } else if (seconds < 30) {
      str = '刚刚'; // 0<时间<30s，显示：刚刚
    } else if (seconds / 60 < 60) {
      str = `${Math.ceil(seconds / 60)}分钟前`; // 30s<时间<60s，显示：1分钟前,60s<时间<60m，显示：x分钟前
    } else if (seconds / 60 / 60 < 24) {
      str = `${Math.ceil(seconds / 60 / 60)}小时前`; // 60m<时间<24h，显示：x小时前
    } else if (seconds / 60 / 60 < 48) {
      str = '昨天'; // 24h<时间<48h，显示：昨天
    } else if (seconds / 60 / 60 / 24 < 7) {
      str = `${Math.ceil(seconds / 60 / 60 / 24) - 1}天前`; // 1d<时间<7d，显示x天前
    } else if (seconds / 60 / 60 / 24 < 30) {
      str = `${start.getMonth() + 1}月${start.getDate()}日`; // 7d<时间<30d，显示：m月d日
    } else {
      str = `${start.getFullYear()}年${start.getMonth() +
        1}月${start.getDate()}日`; // 30d<时间，显示：y年m月d日；
    }
  } catch (error) {
    console.log(error);
  }
  return str;
}
/**
 * 转换格式
 * @param ms Date
 */
function formatTime(ms: number) {
  const d = parseInt(`${ms / (1000 * 60 * 60 * 24)}`, 10);
  const h = parseInt(`${(ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)}`, 10);
  const m = parseInt(`${(ms % (1000 * 60 * 60)) / (1000 * 60)}`, 10);
  const s = parseInt(`${(ms % (1000 * 60)) / 1000}`, 10);
  const days = completion(d);
  const hours = completion(h);
  const minutes = completion(m);
  const seconds = completion(s);
  return {
    d,
    h,
    m,
    s,
    days,
    hours,
    minutes,
    seconds,
  };
}

/**
 * 补全最低两位
 * @param number number
 */
function completion(num: number) {
  return num > 10 ? `${num}` : `0${num}`;
}

/**
 * 把长数组切割成多个固定数量的短数组
 * @param arr 要切割的数组
 * @param len 按什么长度切割
 */
function splitArray(arr: any[], len: number) {
  if (!arr || arr.length === 0 || arr.length <= len) {
    return [arr];
  }
  const arr_length = arr.length;
  const newArr = [];
  for (let i = 0; i < arr_length; i += len) {
    newArr.push(arr.slice(i, i + len));
  }
  return newArr;
}

/**
 * 脱敏电话号码
 * @param phone
 */
function tuominPhone(phone: string) {
  const forword = phone.substring(0, 3);
  const back = phone.substring(7);
  return `${forword}****${back}`;
}

/**
 * 获取键盘状态
 * @return 键盘是否是弹出状态
 */
function getKeyboardStatus() {
  return new Promise((resolve) => {
    console.log('桥接库', NativeModules);
    NativeModules.CustomBridgeManager.getKeyboardStatus((isShow: boolean) => {
      resolve(isShow);
    });
  });
}

/**
 * 隐藏键盘
 */
function hideKeyboard() {
  return getKeyboardStatus().then((isShow) => {
    return new Promise((resolve) => {
      Keyboard.dismiss();
      if (isShow) {
        setTimeout(() => {
          resolve();
        }, 500);
      } else {
        resolve();
      }
    });
  });
}

function patchJSCode(str: string = '') {
  // fix ios webview onMessage:https://github.com/facebook/react-native/issues/10865#issuecomment-269847703
  const patchPostMessageFunction = () => {
    const originalPostMessage = window.postMessage;
    const patchedPostMessage = (message: any, targetOrigin: any, transfer: any) => {
      originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = () => {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    window.postMessage = patchedPostMessage;
  };
  let patchPostMessageJsCode = `(${String(patchPostMessageFunction)})();\n`;
  if (typeof str === 'string') {
    patchPostMessageJsCode += str;
  }
  return patchPostMessageJsCode;
}

export {
  fen2yuan,
  toFixed2,
  getNumFromStr,
  rmSpace,
  checkChinese,
  checkNumNull,
  isEmptyObj,
  transformTime,
  formatTime,
  splitArray,
  tuominPhone,
  hideKeyboard,
  patchJSCode,
};
