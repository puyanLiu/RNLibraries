//
//  RCTUmengPush.h
//  RCTUmengPush
//
//  Created by user on 16/4/24.
//  Copyright © 2016年 react-native-umeng-push. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import <React/RCTEventEmitter.h>

@interface RCTUmengPush : RCTEventEmitter <RCTBridgeModule>
/**
 *  app关闭，进程已死调用
 *
 *  @param application   <#application description#>
 *  @param launchOptions <#launchOptions description#>
 */
+ (void)pushNotificationDidFinishLaunchingWithOptions:(NSDictionary *)launchOptions umKey:(NSString *)umkey delegate:(id <UNUserNotificationCenterDelegate>)delegate;

+ (void)pushNotificationApplication:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

+ (void)pushRegisterDeviceToken:(NSData *)deviceToken;

+ (void)didReceiveRemoteNotification:(NSDictionary *)userInfo;

// 处理前台收到通知的代理方法
+ (void)pushNotificationWillPresentNotification:(NSDictionary *)userInfo;

// 处理后台点击通知的代理方法
+ (void)pushNotificationDidReceiveNotification:(NSDictionary *)userInfo;
@end
