//
//  ShareBundle.m
//  RNShare
//
//  Created by liupuyan on 2017/9/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ShareBundle.h"

static NSString *const ShareBundleKey = @"ShareResource.bundle";

@implementation ShareBundle
/**
 *  获取bundle中的文件路径
 *
 *  @param name 文件名字
 *  @param type 文件类型
 *
 *  @return 文件路径
 */
+ (NSString *)sharePathForResource:(NSString *)name ofType:(NSString *)type {
    NSString *bundlePath = [[NSBundle mainBundle].resourcePath stringByAppendingPathComponent:ShareBundleKey];
    NSBundle *bundle = [NSBundle bundleWithPath:bundlePath];
    return [bundle pathForResource:name ofType:type];
}

+ (UIImage *)shareImageWithName:(NSString *)name {
    
    NSString *imagePath = [ShareBundle sharePathForResource:name ofType:@"png"];
    UIImage *image = [UIImage imageWithContentsOfFile:imagePath];
    
    return image;
}

@end
