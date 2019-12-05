//
//  UIView+Extension.m
//  QQMProject
//
//  Created by admin on 15/10/19.
//  Copyright © 2015年 admin. All rights reserved.
//

#import "UIView+Extension.h"

@implementation UIView (Extension)
- (void)setWidth_:(CGFloat)width_
{
    CGRect frame = self.frame;
    frame.size.width = width_;
    self.frame = frame;
}

- (CGFloat)width_
{
    return self.frame.size.width;
}

- (void)setHeight_:(CGFloat)height_
{
    CGRect frame = self.frame;
    frame.size.height = height_;
    self.frame = frame;
}

- (CGFloat)height_
{
    return self.frame.size.height;
}

- (void)setX_:(CGFloat)x_
{
    CGRect frame = self.frame;
    frame.origin.x = x_;
    self.frame = frame;
}

- (CGFloat)x_
{
    return self.frame.origin.x;
}

- (void)setY_:(CGFloat)y_
{
    CGRect frame = self.frame;
    frame.origin.y = y_;
    self.frame = frame;
}

- (CGFloat)y_
{
    return self.frame.origin.y;
}

- (void)setCenterX_:(CGFloat)centerX_
{
    CGPoint center = self.center;
    center.x = centerX_;
    self.center = center;
}

-(CGFloat)centerX_
{
    return self.center.x;
}

- (void)setCenterY_:(CGFloat)centerY_
{
    CGPoint center = self.center;
    center.y = centerY_;
    self.center = center;
}

- (CGFloat)centerY_
{
    return self.center.y;
}

- (void)setSize_:(CGSize)size_
{
    CGRect frame = self.frame;
    frame.size = size_;
    self.frame = frame;
}

- (CGSize)size_
{
    return self.frame.size;
} 
@end
