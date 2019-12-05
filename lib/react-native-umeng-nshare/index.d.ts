declare module '@lib/react-native-umeng-nshare' {
  export default class UmengShare {
    /**
     * 检查是否安装有相关app供分享
     * @param handler 结果回调
     */
    static supportPlatform(handler?: (err: any, flag: boolean) => void);
    /**
     * 分享
     * @param title 标题
     * @param content 内容
     * @param imgUrl 图片链接
     * @param url 点击跳转链接
     * @param handler 结果回调
     */
    static umengShare(title: string, content: string, imgUrl: string, url: string, handler?: (err: any, flag: boolean) => void);
  }
}