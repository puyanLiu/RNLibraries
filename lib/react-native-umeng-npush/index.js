'use strict';

import React, {
  NativeModules,
  DeviceEventEmitter, //android
  NativeEventEmitter, //ios
  Platform,
  AppState,
} from 'react-native';

const UmengPushModule = NativeModules.UmengPush;
const UmengEmitter = new NativeEventEmitter(UmengPushModule);

var receiveMessageSubscript, openMessageSubscription;

var UmengPush = {

  getDeviceToken(handler) {
    UmengPushModule.getDeviceToken(handler);
  },
  setAutoAlert(value) {
    if(Platform.OS === 'ios') {
      UmengPushModule.setAutoAlert(value);
    } else {
      console.log('安卓不支持该方法');
    }
  },
  sendClickReportForRemoteNotification(userInfo){
    if(Platform.OS === 'ios') {
      UmengPushModule.sendClickReportForRemoteNotification(userInfo);
    } else {
      console.log('安卓不支持该方法');
    }
  },

  didReceiveMessage(handler) {
    receiveMessageSubscript = this.addEventListener(UmengPushModule.DidReceiveMessage, message => {
      //处于后台时，拦截收到的消息
      if(AppState.currentState === 'background') {
        return;
      }
      handler(message);
    });
  },

  didOpenMessage(handler) {
    openMessageSubscription = this.addEventListener(UmengPushModule.DidOpenMessage, handler);
  },

  addAlias(value, type, handler) {
    UmengPushModule.addAlias(value, type, handler);
  },

  deleteAlias(value, type, handler) {
    UmengPushModule.deleteAlias(value, type, handler);
  },

  addEventListener(eventName, handler) {
    if(Platform.OS === 'android') {
      return DeviceEventEmitter.addListener(eventName, (event) => {
        handler(event);
      });
    }
    else {
      return UmengEmitter.addListener(
        eventName, (userInfo) => {
          handler(userInfo);
        });
    }
  },
};

export default UmengPush;
