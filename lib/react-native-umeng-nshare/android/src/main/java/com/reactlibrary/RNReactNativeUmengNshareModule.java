
package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.share.PackageUtil;
import com.share.ShareActivity;

public class RNReactNativeUmengNshareModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private Callback shareCallback;

  public RNReactNativeUmengNshareModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addActivityEventListener(activityEventListener);
  }

  @Override
  public String getName() {
    return "RNUmengShare";
  }

  public static final int INTO_SHARE_PAGE = 10;

  @ReactMethod
  public void umengShare(String title, String content, String imgUrl, String url, Callback callback) {
    shareCallback = callback;
    Intent intent = new Intent(getCurrentActivity(), ShareActivity.class);
    Bundle bundle = new Bundle();
    bundle.putString("title", title);
    bundle.putString("content", content);
    bundle.putString("imgUrl", imgUrl);
    bundle.putString("url", url);
    intent.putExtras(bundle);
    getCurrentActivity().startActivityForResult(intent, INTO_SHARE_PAGE);
  }

  @ReactMethod
  public void supportPlatform(Callback callback) {
    if (PackageUtil.isClientAvilible(getCurrentActivity(), "com.tencent.mm")
            && PackageUtil.isClientAvilible(getCurrentActivity(), "com.tencent.mobileqq")) {
      callback.invoke(null, true);
    } else {
      callback.invoke("没有安装相关分享平台", false);
    }
  }

  private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      if (resultCode == activity.RESULT_OK) {
        switch (requestCode) {
          case INTO_SHARE_PAGE:
              boolean isSuccess = data.getBooleanExtra("isSuccess", false);
              String message = data.getStringExtra("message");
              if (isSuccess) {
                shareCallback.invoke(null, true);
              } else {
                shareCallback.invoke(message, false);
              }
            break;
        }
      }
    }
  };

}