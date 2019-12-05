//
//  ShareView.m
//  ShareProject
//
//  Created by liupuyan on 2017/9/13.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ShareView.h"
#import <UMSocialCore/UMSocialCore.h>
#import "ShareButton.h"
#import "UIView+Extension.h"
#import "ShareBundle.h"

#define ScreenWidth [UIScreen mainScreen].bounds.size.width
#define ScreenHeight [UIScreen mainScreen].bounds.size.height
#define IPHONE4 (ScreenWidth == 320 && ScreenHeight == 480)
#define IPHONE5 (ScreenWidth == 320 && ScreenHeight == 568)
#define IPHONE6 ScreenWidth == 375
#define IPHONE6P ScreenWidth > 375
// 屏幕适配 输入iPhone6尺寸自动生成对应iPhone型号尺寸
#define ScreenAdaptation(sizeOfIphone6) (CGFloat)((IPHONE5 || IPHONE4) ? sizeOfIphone6 * (320.0 / 375.0) : (IPHONE6 ? sizeOfIphone6 : sizeOfIphone6 * (414.0 / 375.0)))
#define KeyWindow [UIApplication sharedApplication].keyWindow ? : [UIApplication sharedApplication].delegate.window

@interface ShareView()
/**
 *  items
 */
@property (nonatomic, strong) NSMutableArray *items;
@end

@implementation ShareView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setupUI];
    }
    return self;
}

+ (void)supportPlatform:(OperationParamBlock)callback {
    if(([UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"wechat://"]] && [UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"weixin://"]]) || ([UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"mqq://"]] && [UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"mqqapi://"]])) {
        if (callback) {
            callback(nil, true);
        }
    } else {
        if (callback) {
            callback([NSError errorWithDomain:UMSocialPlatformErrorDomain code:1001 userInfo:[NSDictionary dictionaryWithObjectsAndKeys:@"没有安装相关分享平台", @"message", nil]], false);
        }
    }
}

- (NSInteger)platformCount {
    return self.items.count;
}

+ (void)show {
    UIView *windowView = KeyWindow;
    ShareView *shareView = [[ShareView alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, ScreenHeight)];
    [windowView addSubview:shareView];
    shareView.tag = 999;
    shareView.y_ = shareView.height_;
    [UIView animateWithDuration:0.5 animations:^{
        shareView.y_ = 0;
    }];
}

+ (void)showWithTitle:(NSString *)title content:(NSString *)content url:(NSString *)url thumbUrl:(NSString *)thumbUrl callback:(OperationParamBlock)callback {
    UIView *windowView = KeyWindow;
    ShareView *shareView = [[ShareView alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, ScreenHeight)];
    shareView.title = title;
    shareView.content = content;
    shareView.url = url;
    shareView.thumbUrl = thumbUrl;
    shareView.callback = callback;
    [windowView addSubview:shareView];
    shareView.tag = 999;
    shareView.y_ = shareView.height_;
    [UIView animateWithDuration:0.5 animations:^{
        shareView.y_ = 0;
    }];
}

+ (void)hide {
    UIView *windowView = KeyWindow;
    [windowView.subviews enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if (obj.tag == 999) {
            [UIView animateWithDuration:0.5 animations:^{
                obj.y_ = obj.height_;
            } completion:^(BOOL finished) {
                [obj removeFromSuperview];
            }];
        }
    }];
}

- (void)setupUI {
    self.backgroundColor = [UIColor clearColor];
    
    UIView *bgView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, ScreenHeight)];
    bgView.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.7];
    [self addSubview:bgView];
    
    UIButton *btnColse = [[UIButton alloc] init];
    [btnColse setImage:[ShareBundle shareImageWithName:@"public_close"] forState:UIControlStateNormal];
    [self addSubview:btnColse];
    CGFloat closeWH = 40;
    btnColse.frame = CGRectMake((ScreenWidth - closeWH) * 0.5, ScreenHeight - closeWH - 38, closeWH, closeWH);
    [btnColse addTarget:self action:@selector(btnCloseClick) forControlEvents:UIControlEventTouchUpInside];
    
    CGFloat btnW = ScreenAdaptation(50);
    CGFloat btnH = ScreenAdaptation(50) + 20;
    CGFloat btnM = ScreenAdaptation(23);
    
    UIView *shareView = [[UIView alloc] init];
    [self addSubview:shareView];
    shareView.height_ = btnH;
    shareView.width_ = self.items.count > 0 ? btnW * self.items.count + btnM * (self.items.count - 1) : 0;
    shareView.y_ = CGRectGetMinY(btnColse.frame) - 55 - btnW;
    shareView.centerX_ = ScreenWidth * 0.5;
    
    CGFloat btnX = 0;
    CGFloat btnY = 0;
    for(int i = 0; i < self.items.count; i++) {
        ShareButton *btn = [self getShareButtonWithTitle:self.items[i][@"title"] image:[ShareBundle shareImageWithName:self.items[i][@"imageNamed"]]];
        [shareView addSubview:btn];
        btn.tag = i;
        btn.frame = CGRectMake(btnX, btnY, btnW, btnH);
        [btn addTarget:self action:@selector(shareClick:) forControlEvents:UIControlEventTouchUpInside];
        btnX = btnX + btnW + btnM;
    }
}

- (ShareButton *)getShareButtonWithTitle:(NSString *)title image:(UIImage *)image {
  ShareButton *btn = [[ShareButton alloc] init];
  [btn setTitle:title forState:UIControlStateNormal];
  [btn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  btn.titleLabel.font = [UIFont systemFontOfSize:12];
  btn.titleLabel.textAlignment = NSTextAlignmentCenter;
  [btn setImage:image forState:UIControlStateNormal];
  return btn;
}

- (void)shareClick:(ShareButton *)sender {
  NSInteger index = sender.tag;
  UMSocialPlatformType type = [self.items[index][@"platformType"] integerValue];
  if (type == UMSocialPlatformType_WechatSession || type == UMSocialPlatformType_WechatTimeLine) {
    if(!([UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"wechat://"]] && [UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"weixin://"]])) {
      NSLog(@"未安装微信");
      return;
    }
  } else if (type == UMSocialPlatformType_QQ || type == UMSocialPlatformType_Qzone) {
    if(!([UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"mqq://"]] && [UIApplication.sharedApplication canOpenURL:[NSURL URLWithString:@"mqqapi://"]])) {
      NSLog(@"未安装QQ");
      return;
    }
  }
  
  [self btnCloseClick];
  [self shareWithType:type title:self.title content:self.content url:self.url thumbUrl:self.thumbUrl callback:self.callback];
}

- (void)btnCloseClick {
  [ShareView hide];
}

- (void)shareWithType:(UMSocialPlatformType)platformType title:(NSString *)title content:(NSString *)content url:(NSString *)url thumbUrl:(NSString *)thumbUrl callback:(OperationParamBlock)callback {
  
  NSString *titleStr = title.length > 0 ? title : @"星空商城，24小时钱包救星";
  NSString *contentStr = content.length > 0 ? content : @"5分钟快速到账，操作简单一键通过！";
  NSString *urlStr = url.length > 0 ? url : @"http://www.ttjiekuan.com";
  
  //创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  //创建网页内容对象
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:titleStr descr:contentStr thumImage:thumbUrl.length > 0 ? thumbUrl : nil];
  //设置网页地址
  shareObject.webpageUrl = urlStr;
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  //调用分享接口
  [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
    if (error) {
      if (callback) {
        callback(error, false);
      }
      UMSocialLogInfo(@"************Share fail with error %@*********",error);
    } else {
      if (callback) {
        callback(nil, true);
      }
      if ([data isKindOfClass:[UMSocialShareResponse class]]) {
        UMSocialShareResponse *resp = data;
        //分享结果消息
        UMSocialLogInfo(@"response message is %@",resp.message);
        //第三方原始返回的数据
        UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
        
      } else {
        UMSocialLogInfo(@"response data is %@",data);
      }
    }
  }];
}

- (NSMutableArray *)items {
 if(!_items) {
     _items = [[NSMutableArray alloc] init];
     if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"wechat://"]] && [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"weixin://"]]) {
         [_items addObject:[[NSDictionary alloc] initWithObjectsAndKeys:@"微信", @"title", @"share_wechat", @"imageNamed", @(UMSocialPlatformType_WechatSession), @"platformType", nil]];
         [_items addObject:[[NSDictionary alloc] initWithObjectsAndKeys:@"朋友圈", @"title", @"share_circle", @"imageNamed", @(UMSocialPlatformType_WechatTimeLine), @"platformType", nil]];
     }
     if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"mqq://"]] && [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"mqqapi://"]]) {
         [_items addObject:[[NSDictionary alloc] initWithObjectsAndKeys:@"QQ", @"title", @"share_QQ", @"imageNamed", @(UMSocialPlatformType_QQ), @"platformType", nil]];
         [_items addObject:[[NSDictionary alloc] initWithObjectsAndKeys:@"QQ空间", @"title", @"share_Qzone", @"imageNamed", @(UMSocialPlatformType_Qzone), @"platformType", nil]];
     }
 }
 return _items;
}

@end
