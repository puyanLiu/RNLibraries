//
//  NSString+Extension.h
//  RNLibraries
//
//  Created by liupuyan on 2019/12/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSString (Extension)

// 将NSString转换成UTF8编码的NSString
- (NSString *)getUTF8String;
  
/**
 获得系统时间
 
 @return <#return value description#>
 */
+ (NSString *)sh_stringDate;
@end

NS_ASSUME_NONNULL_END
