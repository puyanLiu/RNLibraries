//
//  RNConfig.m
//  RNLibraries
//
//  Created by liupuyan on 2019/12/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNConfig.h"

@implementation RNConfig

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}
+ (BOOL)requiresMainQueueSetup {
  return YES;
}
RCT_EXPORT_MODULE()

+ (instancetype)shareConfigHelp {
  static id instance;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    instance = [[self alloc] init];
  });
  return instance;
}

- (instancetype)init {
  if(self = [super init]) {
    [self loadData];
  }
  return self;
}

- (NSDictionary *)constantsToExport {
  NSMutableDictionary *dict = [NSMutableDictionary dictionary];
  dict[@"isSimulator"] = @(_isSimulator);
  dict[@"UMengAppKey"] = _UMengAppKey;
  dict[@"AppId"] = _AppId;
  dict[@"RootURL"] = _rootURL;
  return dict;
}

- (void)loadData {
  NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
  [center  addObserver:self selector:@selector(keyboardDidShow)  name:UIKeyboardDidShowNotification object:nil];
  [center addObserver:self selector:@selector(keyboardDidHide)  name:UIKeyboardWillHideNotification object:nil];
  _keyboardIsVisible = NO;
  [self loadConfigPlist];
#if TARGET_IPHONE_SIMULATOR
  _isSimulator = YES;
#else
  _isSimulator = NO;
#endif
}

- (void)loadConfigPlist {
  NSBundle *bundle = [NSBundle mainBundle];
  NSString *name = [[bundle infoDictionary] objectForKey:@"ConfigPlistName"];
  NSCAssert(name, @"name: 多环境config的plist文件配置错误!");
  NSString *path = [bundle pathForResource:name ofType:@"plist"];
  NSCAssert(path, @"path: 多环境config的plist文件配置错误!");
  NSDictionary *dictionary = [NSDictionary dictionaryWithContentsOfFile:path];
  NSCAssert(dictionary, @"config: 多环境config的plist文件配置错误!");
  
  _AppId = [self getValueWithDict:dictionary key:@"AppId"];
  _rootURL = [self getValueWithDict:dictionary key:@"rootUrl"];
  _UMengAppKey = [self getValueWithDict:dictionary key:@"UMengAppKey"];
  _wechatAppKey = [self getValueWithDict:dictionary key:@"wechatAppKey"];
  _wechatAppSecret = [self getValueWithDict:dictionary key:@"wechatAppSecret"];
  _qqAppKey = [self getValueWithDict:dictionary key:@"qqAppKey"];
  _qqAppSecret = [self getValueWithDict:dictionary key:@"qqAppSecret"];
}

- (NSString *)getValueWithDict:(NSDictionary *)dict key:(NSString *)key {
  return dict[key] ?: @"";
}


- (void)keyboardDidShow {
  _keyboardIsVisible = YES;
}

- (void)keyboardDidHide {
  _keyboardIsVisible = NO;
}

@end
