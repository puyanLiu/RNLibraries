//
//  ShareHelp.h
//  RNShare
//
//  Created by liupuyan on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ShareHelp : NSObject

+ (void)setupSocialWithUrl:(NSString *)url UmKey:(NSString *)umkey wechatKey:(NSString *)wechatKey wechatSecret:(NSString *)wechatSecret qqKey:(NSString *)qqkey qqSecret:(NSString *)qqSecret;

@end
