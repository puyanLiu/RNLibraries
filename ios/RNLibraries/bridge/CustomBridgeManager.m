//
//  CustomBridgeManager.m
//  RNLibraries
//
//  Created by liupuyan on 2019/12/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CustomBridgeManager.h"
#import "RNConfig.h"
#import <AVFoundation/AVFoundation.h>
#import <AssetsLibrary/ALAssetsLibrary.h>
#import <AssetsLibrary/ALAssetRepresentation.h>
#import <AssetsLibrary/ALAsset.h>
#import <Photos/Photos.h>

@implementation CustomBridgeManager

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}
+ (BOOL)requiresMainQueueSetup {
  return YES;
}
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getKeyboardStatus: (RCTResponseSenderBlock)callback) {
  BOOL isShow = [RNConfig shareConfigHelp].keyboardIsVisible;
  if (callback) {
    callback(@[@(isShow)]);
  }
}

// 相机权限
RCT_EXPORT_METHOD(checkCameraPermission:(RCTResponseSenderBlock)callback) {
  __block BOOL isAuthorized = NO;
  // 获取权限状态
  PHAuthorizationStatus authStatus = [PHPhotoLibrary authorizationStatus];
  if (authStatus == PHAuthorizationStatusNotDetermined) {
    RNLog(@"第一次弹授权弹窗");
    // 请求权限
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
      dispatch_async(dispatch_get_main_queue(), ^{
        if (status == PHAuthorizationStatusAuthorized) {
          RNLog(@"点击了弹窗的允许");
          isAuthorized = YES;
          callback(@[@(isAuthorized)]);
        } else {
          RNLog(@"点击了弹窗的拒绝");
          isAuthorized = NO;
          callback(@[@(isAuthorized)]);
        }
      });
    }];
  } else if (authStatus == PHAuthorizationStatusAuthorized) {
    RNLog(@"用户早就允许了");
    isAuthorized = YES;
    callback(@[@(isAuthorized)]);
  } else {
    RNLog(@"用户早就拒绝了");
    isAuthorized = NO;
    callback(@[@(isAuthorized)]);
  }
}

// 跳转到系统设置中心
RCT_EXPORT_METHOD(gotoSystemSetupCenter) {
  NSURL * url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
  if ([[UIApplication sharedApplication] canOpenURL:url]) {
    if (iOS10) {
      // 默认NO，如果没有有效连接则会在Safari打开
      NSDictionary *options = @{UIApplicationOpenURLOptionUniversalLinksOnly : @NO};
      [[UIApplication sharedApplication] openURL:url options:options completionHandler:nil];
    } else {
      [[UIApplication sharedApplication] openURL:url];
    }
  }
}

RCT_EXPORT_METHOD(pushIsOpen:(RCTResponseSenderBlock)callback) {
  UIUserNotificationSettings *setting = [[UIApplication sharedApplication] currentUserNotificationSettings];
  if (UIUserNotificationTypeNone != setting.types) {
    callback(@[[NSNull null], @YES]);
    return;
  }
  callback(@[[NSNull null], @NO]);
}

// js加载完成
RCT_EXPORT_METHOD(jsLoaded) {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"jsLoaded" object:@""];
}

@end
