
package com.reactlibrary;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.push.LogUtil;
import com.push.UmengPushApplication;
import com.umeng.message.IUmengCallback;
import com.umeng.message.PushAgent;
import com.umeng.message.UTrack;
import com.umeng.message.common.inter.ITagManager;
import com.umeng.message.entity.UMessage;
import com.umeng.message.tag.TagManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class RNReactNativeUmengNpushModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

  public static final String DidReceiveMessage = "DidReceiveMessage";
  public static final String DidOpenMessage = "DidOpenMessage";
  private final ReactApplicationContext mReactContext;
  private UmengPushApplication mPushApplication;

  public RNReactNativeUmengNpushModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.mReactContext = reactContext;
    //设置module给application
    UmengPushApplication application = (UmengPushApplication)reactContext.getBaseContext();
    mPushApplication = application;
    //添加监听
    mReactContext.addLifecycleEventListener(this);
  }

  @Override
  public String getName() {
    return "UmengPush";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DidReceiveMessage, DidReceiveMessage);
    constants.put(DidOpenMessage, DidOpenMessage);
    return constants;
  }

  public void sendEvent(String eventName, UMessage msg) {
    sendEvent(eventName, convertToWriteMap(msg));
  }

  public void sendEvent(String eventName, String msg) {
    sendEvent(eventName, convertToWriteMap(msg));
  }

  private void sendEvent(String eventName, @Nullable WritableMap params) {
    // 此处需要添加hasActiveCatalystInstance，否则可能造成崩溃
    // 问题解决参考: https://github.com/walmartreact/react-native-orientation-listener/issues/8
    if(mReactContext.hasActiveCatalystInstance()) {
      LogUtil.i("hasActiveCatalystInstance");
      mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    } else {
      LogUtil.i("not hasActiveCatalystInstance");
    }
  }

  private WritableMap convertToWriteMap(String msg) {
    WritableMap map = Arguments.createMap();
    //遍历Json
    JSONObject jsonObject = null;
    try {
      jsonObject = new JSONObject(msg);
    } catch (JSONException e) {
      e.printStackTrace();
    }
    Iterator<String> keys = jsonObject.keys();
    String key;
    while (keys.hasNext()) {
      key = keys.next();
      try {
        map.putString(key, jsonObject.get(key).toString());
      } catch (Exception e) {
        LogUtil.i("putString fail");
      }
    }
    return map;
  }

  private WritableMap convertToWriteMap(UMessage msg) {
    WritableMap map = Arguments.createMap();
    //遍历Json
    JSONObject jsonObject = msg.getRaw();
    Iterator<String> keys = jsonObject.keys();
    String key;
    while (keys.hasNext()) {
      key = keys.next();
      try {
        map.putString(key, jsonObject.get(key).toString());
      } catch (Exception e) {
        LogUtil.i("putString fail");
      }
    }
    return map;
  }

  @Override
  public void onHostResume() {
    mPushApplication.setmPushModule(this);
  }

  @Override
  public void onHostPause() {

  }

  @Override
  public void onHostDestroy() {
    mPushApplication.setmPushModule(this);
  }

  /**
   * 获取设备id
   * @param callback
   */
  @ReactMethod
  public void getDeviceToken(Callback callback) {
    String registrationId = mPushApplication.getmRegistrationId();
    callback.invoke(registrationId);
  }

  /**
   * 添加标签
   */
  @ReactMethod
  public void addTags(String... tag) {
    PushAgent mPushAgent = mPushApplication.getmPushAgent();
    mPushAgent.getTagManager().addTags(new TagManager.TCallBack() {
      @Override
      public void onMessage(boolean isSuccess, ITagManager.Result result) {
        // isSuccess表示操作是否成功
        if (isSuccess) {
          LogUtil.i("推送标签添加成功" + result.remain);
        }
      }
    }, tag);
  }

  /**
   * 删除标签
   */
  @ReactMethod
  public void deleteTags(String... tag) {
    PushAgent mPushAgent = mPushApplication.getmPushAgent();
    mPushAgent.getTagManager().deleteTags(new TagManager.TCallBack() {
      @Override
      public void onMessage(boolean isSuccess, ITagManager.Result result) {
        // isSuccess表示操作是否成功
        if (isSuccess) {
          LogUtil.i("推送标签删除成功" + result.remain);
        }
      }
    }, tag);
  }

  /**
   * 设置用户别名
   */
  @ReactMethod
  public void addAlias(String value, String type, final Callback callback) {
    PushAgent mPushAgent = mPushApplication.getmPushAgent();
    mPushAgent.addAlias(value, type, new UTrack.ICallBack() {
      @Override
      public void onMessage(boolean isSuccess, String message) {
        if (isSuccess) {
          LogUtil.i("推送别名设置成功" + message);
          callback.invoke(true, "推送别名设置成功" + message);
        } else {
          LogUtil.i("推送别名设置失败" + message);
          callback.invoke(false, "推送别名设置失败" + message);
        }
      }
    });
  }

  /**
   * 移除用户别名
   */
  @ReactMethod
  public void deleteAlias(String value, String type, final Callback callback) {
    PushAgent mPushAgent = mPushApplication.getmPushAgent();
    mPushAgent.deleteAlias(value, type, new UTrack.ICallBack() {
      @Override
      public void onMessage(boolean isSuccess, String message) {
        if (isSuccess) {
          LogUtil.i("推送别名删除成功" + message);
          callback.invoke(true, "推送别名删除成功" + message);
        } else {
          LogUtil.i("推送别名删除失败" + message);
          callback.invoke(true, "推送别名删除失败" + message);
        }
      }
    });
  }

  /**
   * 友盟推送打开
   */
  @ReactMethod
  public void open() {
    PushAgent mPushAgent = mPushApplication.getmPushAgent();
    mPushAgent.enable(new IUmengCallback() {
      @Override
      public void onSuccess() {

      }

      @Override
      public void onFailure(String s, String s1) {

      }
    });

  }

  /**
   * 友盟推送关闭
   */
  @ReactMethod
  public void close() {
    PushAgent mPushAgent = mPushApplication.getmPushAgent();
    mPushAgent.disable(new IUmengCallback() {
      @Override
      public void onSuccess() {

      }

      @Override
      public void onFailure(String s, String s1) {

      }
    });
  }
}