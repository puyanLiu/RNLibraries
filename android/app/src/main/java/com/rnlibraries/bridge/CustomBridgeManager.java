package com.rnlibraries.bridge;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rnlibraries.MainApplication;

public class CustomBridgeManager extends ReactContextBaseJavaModule {

    private Context mContext;
    public CustomBridgeManager(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
//        return getClass().getSimpleName();
        return "CustomBridgeManager";
    }

    @ReactMethod
    public void getKeyboardStatus(final Callback callback) {
        if (callback != null) {
            callback.invoke(MainApplication.isKeyboardShowing());
        }
    }
}
