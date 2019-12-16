//
//  RNViewController.m
//  RNLibraries
//
//  Created by liupuyan on 2019/12/16.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNViewController.h"

@interface RNViewController ()

@end

@implementation RNViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  [self initView];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(jsLoaded:) name:@"jsLoaded" object:nil];
}

- (void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  
  [self.navigationController setNavigationBarHidden:YES animated:NO];
}

- (void)viewDidAppear:(BOOL)animated {
  [super viewDidAppear:animated];
  
  self.navigationController.interactivePopGestureRecognizer.enabled = NO;
  self.navigationController.interactivePopGestureRecognizer.delegate = nil;
}

- (void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
  
  [self.navigationController setNavigationBarHidden:NO animated:NO];
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)initView {
}

- (void)jsLoaded:(NSNotification *)noti {
  RNLog(@"====================================================");
//  [RNSplashScreen hide];
}


@end
