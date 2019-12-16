import config from '../config';

/**
 * 网络状态返回非200会reject
 * @param response
 */
function checkStatus(response: any) {
  if (response.status !== 200) {
    return Promise.reject({
      des: `网络错误：${response.status}`,
    });
  }
  return response;
}

/**
 * 转换成JSON
 * @param response
 */
function parseJSON(response: any) {
  return response.json();
}

function xFetch(requestPath: string, options?: any) {
  const url = `${config.API_URL}${requestPath}`;

  const opts = { ...options };

  // console.group() 方法用于设置分组信息的起始位置，该位置之后的所有信息将写入分组
  // console.groupEnd() 方法来结束当前的分组
  // console.groupCollapsed() 方法来隐藏分组信息。
  if (__DEV__ && console.group) {
    console.group(`%c 网络请求`, 'color: blue; font-weight: lighter;');
    console.log('请求链接：', url);
    console.log('请求参数：', opts);
    console.groupEnd();
  }

  // fetch方法会返回一个Promise
  // Promise.race将多个Promise实例，包装成一个新的Promise实例
  return Promise.race([
    fetch(url, opts)
      .then(checkStatus)
      .then(parseJSON),
      // .catch((error) => {
      //   console.log('request failed', error);
      // }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject({ des: '网络超时' }), config.NET_TIMEOUT);
    }),
  ]);
}

export default xFetch;
