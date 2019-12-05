declare module '@lib/react-native-umeng-npush' {
  export default class UmengPush {
    /**
     * 获取 DeviceToken
     * @param handler 获取成功回调
     */
    static getDeviceToken(handler?: (e?: any) => void);

    /**
     * 是否关闭友盟弹窗, 只支持iOS
     * @param close 关闭友盟弹窗
     */
    static setAutoAlert(close: boolean);

    /**
     * 自定义弹框 确定按钮调用, 只支持iOS
     * @param obj 
     */
    static sendClickReportForRemoteNotification(obj?: any);

    /**
     * 监听接收到推送消息
     * @param handler 接收到推送消息回调
     */
    static didReceiveMessage(handler?: (e?: any) => void);

    /**
     * 监听点击推送消息打开应用
     * @param handler 点击推送消息打开应用回调
     */
    static didOpenMessage(handler?: (e?: any) => void);

    /**
     * 添加别名
     * @param value 别名
     * @param type 别名类型
     * @param handler 添加后结果回调
     */
    static addAlias(value: string, type: string, handler?: (e?: any) => void);

    /**
     * 移除别名
     * @param value 别名
     * @param type 别名类型
     * @param handler 移除后结果回调
     */
    static deleteAlias(value: string, type: string, handler?: (e?: any) => void);
  }
}