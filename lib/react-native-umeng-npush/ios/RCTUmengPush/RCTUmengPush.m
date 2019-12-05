//
//  RCTUmengPush.m
//  RCTUmengPush
//
//  Created by user on 16/4/24.
//  Copyright © 2016年 react-native-umeng-push. All rights reserved.
//

#import "RCTUmengPush.h"
#import <UIKit/UIKit.h>
#import "UMessage.h"
#import <React/RCTEventDispatcher.h>
// Log
#ifdef DEBUG
#define QQMLog(...) NSLog(__VA_ARGS__)
#else
#define QQMLog(...)
#endif

#define iOS10 ([[[UIDevice currentDevice] systemVersion] floatValue] >= 10.0)

static RCTUmengPush *_instance = nil;
static NSString * const DidReceiveMessage = @"DidReceiveMessage";
static NSString * const DidOpenMessage = @"DidOpenMessage";

@interface RCTUmengPush ()
@property (nonatomic, copy) NSString *deviceToken;
@end

@implementation RCTUmengPush

- (dispatch_queue_t)methodQueue
{
    return [RCTUmengPush sharedMethodQueue];
}

+ (BOOL)requiresMainQueueSetup {
    return true;
}

RCT_EXPORT_MODULE(UmengPush)

+ (dispatch_queue_t)sharedMethodQueue {
    static dispatch_queue_t methodQueue;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        methodQueue = dispatch_queue_create("com.react-native-umeng-push", DISPATCH_QUEUE_SERIAL);
    });
    return methodQueue;
}

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if(_instance == nil) {
            _instance = [[self alloc] init];
        }
    });
    return _instance;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if(_instance == nil) {
            _instance = [super allocWithZone:zone];
        }
    });
    return _instance;
}

- (NSDictionary<NSString *, id> *)constantsToExport {
    return @{
             DidReceiveMessage: DidReceiveMessage,
             DidOpenMessage: DidOpenMessage,
             };
}

- (NSArray<NSString *> *)supportedEvents {
    return @[DidReceiveMessage, DidOpenMessage];
}

// 获取设备信息
RCT_EXPORT_METHOD(getDeviceToken:(RCTResponseSenderBlock)callback) {
    NSString *deviceToken = [RCTUmengPush sharedInstance].deviceToken;
    if(deviceToken == nil) {
        deviceToken = @"";
    }
    callback(@[deviceToken]);
}

// 是否关闭友盟弹框
RCT_EXPORT_METHOD(setAutoAlert:(BOOL)value) {
    [UMessage setAutoAlert:value];
}

// 自定义弹框 确定按钮调用
RCT_EXPORT_METHOD(sendClickReportForRemoteNotification:(nullable NSDictionary *)userInfo) {
    QQMLog(@"为某个消息发送点击事件---------%@", userInfo);
    [UMessage sendClickReportForRemoteNotification:userInfo];
}

RCT_EXPORT_METHOD(addAlias:(NSString *)value type:(NSString *)type callback:(RCTResponseSenderBlock)callback) {
    if (value && type) {
        [UMessage setAlias:[NSString stringWithFormat:@"%@", value] type:type response:^(id  _Nonnull responseObject, NSError * _Nonnull error) {
            QQMLog(@"set--Id--------------%@-----------------%@", responseObject, error);
            if (error == nil) {
                callback(@[@true, @"推送别名设置成功", responseObject]);
            } else {
                callback(@[@false, @"推送别名设置失败", error]);
            }
        }];
    }
}

RCT_EXPORT_METHOD(deleteAlias:(NSString *)value type:(NSString *)type callback:(RCTResponseSenderBlock)callback) {
    if (value && type) {
        [UMessage removeAlias:[NSString stringWithFormat:@"%@", value] type:type response:^(id  _Nonnull responseObject, NSError * _Nonnull error) {
            QQMLog(@"remove--Id--------------%@-----------------%@", responseObject, error);
            if (error == nil) {
                callback(@[@true, @"推送别名删除成功", responseObject]);
            } else {
                callback(@[@false, @"推送别名删除失败", error]);
            }
        }];
    }
}

/**
 *  app关闭，进程已死调用
 *
 *  @param application   <#application description#>
 *  @param launchOptions <#launchOptions description#>
 */
+ (void)pushNotificationDidFinishLaunchingWithOptions:(NSDictionary *)launchOptions umKey:(NSString *)umkey delegate:(id <UNUserNotificationCenterDelegate>)delegate {
    [UMessage startWithAppkey:umkey launchOptions:launchOptions];
    // 注册通知
    [UMessage registerForRemoteNotifications];
    if (iOS10) {
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        center.delegate = delegate;
        UNAuthorizationOptions types10 = UNAuthorizationOptionBadge | UNAuthorizationOptionAlert | UNAuthorizationOptionSound;
        [center requestAuthorizationWithOptions:types10 completionHandler:^(BOOL granted, NSError * _Nullable error) {
            if (granted) {
                // 允许
                QQMLog(@"注册成功");
            } else {
                // 不允许
                QQMLog(@"注册失败");
            }
        }];
    }
    
#ifdef DEBUG
    [UMessage setLogEnabled:YES];
#endif
    // 关闭友盟自带弹框
    //    [UMessage setAutoAlert:NO];
    
    // 点击推送跳转到指定页面UIApplicationLaunchOptionsLocalNotificationKey
    QQMLog(@"推送内容-------%@", launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey]);
    if (!iOS10) {
        // 由推送打开应用
        if (launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey]) {
            [self didReceiveRemoteNotificationWhenFirstLaunchApp:launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey]];
        }
    }
}

+ (void)didReceiveRemoteNotificationWhenFirstLaunchApp:(NSDictionary *)userInfo {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), [self sharedMethodQueue], ^{
        //判断当前模块是否正在加载，已经加载成功，则发送事件
        if(![RCTUmengPush sharedInstance].bridge.isLoading) {
            [UMessage didReceiveRemoteNotification:userInfo];
            [[RCTUmengPush sharedInstance] didOpenRemoteNotification:userInfo];
        } else {
            [self didReceiveRemoteNotificationWhenFirstLaunchApp:userInfo];
        }
    });
}

// 给js发送事件
- (void)didOpenRemoteNotification:(NSDictionary *)userInfo {
    [self sendEventWithName:DidOpenMessage body:userInfo];
    
    // js端不调用
    //    dispatch_async(dispatch_get_main_queue(), ^{
    //        [self.bridge.eventDispatcher sendAppEventWithName:DidOpenMessage body:userInfo];
    //    });
}

// 前台接收到推送 自定义弹框
- (void)didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [self sendEventWithName:DidReceiveMessage body:userInfo];
    //    dispatch_async(dispatch_get_main_queue(), ^{
    //        [self.bridge.eventDispatcher sendAppEventWithName:DidReceiveMessage body:userInfo];
    //    });
}

+ (void)pushNotificationApplication:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    //  QQMLog(@"fetchCompletionHandler推送内容-------%@", userInfo);
    // 关闭友盟自带弹框
    //    [UMessage setAutoAlert:NO];
    [UMessage didReceiveRemoteNotification:userInfo];
    // 自定义弹框
    if (application.applicationState == UIApplicationStateActive) {
        [[RCTUmengPush sharedInstance] didReceiveRemoteNotification:userInfo];
        // userInfo title userInfo[@"aps"][@"alert"][@"title"] message userInfo[@"aps"][@"alert"][@"body"]
        // 点击确定按钮要做的事情
        [UMessage sendClickReportForRemoteNotification:userInfo];
    } else {
        [[RCTUmengPush sharedInstance] didOpenRemoteNotification:userInfo];
    }
}

+ (void)pushRegisterDeviceToken:(NSData *)deviceToken {
    QQMLog(@"设备deviceToken-------%@",[[[[deviceToken description] stringByReplacingOccurrencesOfString: @"<" withString: @""]
                                       stringByReplacingOccurrencesOfString: @">" withString: @""]
                                      stringByReplacingOccurrencesOfString: @" " withString: @""]);
    [RCTUmengPush sharedInstance].deviceToken = [[[[deviceToken description] stringByReplacingOccurrencesOfString: @"<" withString: @""]
                                                  stringByReplacingOccurrencesOfString: @">" withString: @""]
                                                 stringByReplacingOccurrencesOfString: @" " withString: @""];
    [UMessage registerDeviceToken:deviceToken];
}

+ (void)didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [UMessage didReceiveRemoteNotification:userInfo];
}

// 处理前台收到通知的代理方法
+ (void)pushNotificationWillPresentNotification:(NSDictionary *)userInfo {
    // 应用处于前台时的远程推送接受
    // 关闭友盟自带弹框
    //    [UMessage setAutoAlert:NO];
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    [[RCTUmengPush sharedInstance] didReceiveRemoteNotification:userInfo];
    //    [LWAlertHelp showAlertWithTarget:QQMKeyWindow.rootViewController title:userInfo[@"aps"][@"alert"][@"title"] message:userInfo[@"aps"][@"alert"][@"body"]  buttonText:@"确定" action:^{
    //      [UMessage sendClickReportForRemoteNotification:userInfo];
    //      //            [PushHelp application:[UIApplication sharedApplication] didReceiveRemoteNotification:userInfo];
    //    }];
}

// 处理后台点击通知的代理方法
+ (void)pushNotificationDidReceiveNotification:(NSDictionary *)userInfo {
    // 应用处于后台时的远程推送接受
    // 必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    [[RCTUmengPush sharedInstance] didOpenRemoteNotification:userInfo];
}

@end
