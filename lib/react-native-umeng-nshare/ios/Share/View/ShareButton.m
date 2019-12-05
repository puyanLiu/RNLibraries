//
//  ShareButton.m
//  ShareProject
//
//  Created by liupuyan on 2017/9/13.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ShareButton.h"

@implementation ShareButton

- (void)layoutSubviews {
  [super layoutSubviews];
  
  CGSize size = self.frame.size;
  self.imageView.frame = CGRectMake(0, 0, size.width, size.width);
  self.titleLabel.frame = CGRectMake(0, size.width + 10, size.width, size.height - size.width - 10);
}

@end
