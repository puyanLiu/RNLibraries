//
//  ShareHelp.m
//  RNShare
//
//  Created by liupuyan on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ShareHelp.h"
#import <UMSocialCore/UMSocialCore.h>

@implementation ShareHelp

+ (void)setupSocialWithUrl:(NSString *)url UmKey:(NSString *)umkey wechatKey:(NSString *)wechatKey wechatSecret:(NSString *)wechatSecret qqKey:(NSString *)qqkey qqSecret:(NSString *)qqSecret {
    NSString *redictUrl = url;
    /* 打开调试日志 */
    [[UMSocialManager defaultManager] openLog:YES];
    
    /* 设置友盟appkey */
    [[UMSocialManager defaultManager] setUmSocialAppkey:umkey];
    
    /*
     设置微信的appKey和appSecret
     */
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:wechatKey appSecret:wechatSecret redirectURL:redictUrl];
    /*
     设置分享到QQ互联的appID
     */
    [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:qqkey appSecret:qqSecret redirectURL:redictUrl];
    
}
@end
