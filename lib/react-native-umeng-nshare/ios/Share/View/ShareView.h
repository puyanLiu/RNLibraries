//
//  ShareView.h
//  ShareProject
//
//  Created by liupuyan on 2017/9/13.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void(^OperationParamBlock)(NSError *error,BOOL flag);

@interface ShareView : UIView
/**
 *  标题
 */
@property (nonatomic, strong) NSString *title;
/**
 *  内容
 */
@property (nonatomic, strong) NSString *content;
/**
 *  链接
 */
@property (nonatomic, strong) NSString *url;
/**
 *  小图标
 */
@property (nonatomic, strong) NSString *thumbUrl;
/**
 *  回调函数
 */
@property (nonatomic, strong) OperationParamBlock callback;

/**
 返回展示的平台数量 等于0 表示微信、QQ平台均为安装，并且不会展示分享页面， RN端需提示没有安装客户端
 
 @return <#return value description#>
 */
+ (void)supportPlatform:(OperationParamBlock)callback;

+ (void)show;

+ (void)showWithTitle:(NSString *)title content:(NSString *)content url:(NSString *)url thumbUrl:(NSString *)thumbUrl callback:(OperationParamBlock)callback;


@end
