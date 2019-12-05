//
//  ShareBundle.h
//  RNShare
//
//  Created by liupuyan on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface ShareBundle : NSObject
/**
 *  获取bundle中的文件路径
 *
 *  @param name 文件名字
 *  @param type 文件类型
 *
 *  @return 文件路径
 */
+ (NSString *)sharePathForResource:(NSString *)name ofType:(NSString *)type;

+ (UIImage *)shareImageWithName:(NSString *)name;
@end
