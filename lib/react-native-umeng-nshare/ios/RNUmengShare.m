
#import "RNUmengShare.h"
#import "ShareView.h"
#import <React/RCTUtils.h>

@implementation RNUmengShare

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(supportPlatform:(RCTResponseSenderBlock)callback) {
    [ShareView supportPlatform:^(NSError *error, BOOL flag) {
        if(error) {
            id jsError = RCTMakeError(@"没有安装相关分享平台", error, nil);
            callback(@[jsError, @(flag)]);
        } else {
            callback(@[[NSNull null], @(flag)]);
        }
    }];
}

RCT_EXPORT_METHOD(umengShare:(NSString *)title content:(NSString *)content thumbUrl:(NSString *)thumbUrl url:(NSString *)url callback:(RCTResponseSenderBlock)callback) {
    [ShareView showWithTitle:title content:content url:url thumbUrl:thumbUrl callback:^(NSError *error, BOOL flag) {
        if(error) {
            id jsError = RCTMakeError(@"分享失败", error, nil);
            callback(@[jsError, @(flag)]);
        } else {
            callback(@[[NSNull null], @(flag)]);
        }
    }];
}


@end
  
