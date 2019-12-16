//
//  RNConfig.h
//  RNLibraries
//
//  Created by liupuyan on 2019/12/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNConfig : NSObject <RCTBridgeModule>

+ (instancetype)shareConfigHelp;

/**
 * 键盘是否是弹出状态
 */
@property (nonatomic, assign, readonly) BOOL keyboardIsVisible;
/**
 * 运行的设备是否是模拟器
 */
@property (nonatomic, assign, readonly) BOOL isSimulator;
/**
 *  AppId
 */
@property (nonatomic, copy, readonly) NSString *AppId;
/**
 *  UMengAppKey
 */
@property (nonatomic, copy, readonly) NSString *UMengAppKey;
/**
 *  rootURL
 */
@property (nonatomic, copy, readonly) NSString *rootURL;
@property (nonatomic, copy, readonly) NSString *wechatAppKey;
@property (nonatomic, copy, readonly) NSString *wechatAppSecret;
@property (nonatomic, copy, readonly) NSString *qqAppKey;
@property (nonatomic, copy, readonly) NSString *qqAppSecret;
@end

NS_ASSUME_NONNULL_END
