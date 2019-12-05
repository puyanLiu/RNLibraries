package com.push;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.util.Log;

/**
 * Created by liupuyan on 2017/10/20.
 *
 * BuildConfig.java中始终Relase原因，BuildConfig.DEBUG始终false
 * BuildConfig.java编译自动生成的，并且每个Module都会生成一份，以该 Module 的 packageName 为 BuildConfig.java 的 packageName。所以如果你的应用有多个 Module 就会有多个 BuildConfig.java 生成
 * 编译时被依赖的 Module 默认会提供 Release 版给其他 Module 或工程使用，这就导致该 BuildConfig.DEBUG 会始终为 false
 */

public class LogUtil {

    private LogUtil() {
        throw new UnsupportedOperationException("不能实例化");
    }

    private static Boolean isDebug = null;
    private static final String TAG = "umeng push===========>";

    public static boolean isDebug() {
        return isDebug == null ? false : isDebug.booleanValue();
    }

    /**
     * 使用 ApplicationInfo.FLAG_DEBUGGABLE
     *
     * 反编译 Debug 包和 Release
     * AndroidManifest.xml 中 application 节点的 android:debuggable 值是不同的
     * Debug 包值为 true，Release 包值为 false，这是编译自动修改的
     *
     * @param context
     */
    public static void syncIsDebug(Context context) {
        if (isDebug == null) {
            isDebug = context.getApplicationInfo() != null &&
                    (context.getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        }
    }

    /**
     * 通过反射得到真正执行的Module的BuildConfig，在Application调用此方法
     * LogUtil.syncIsDebug(getApplicationContext());
     *
     * 此方法存在问题：
     * 因为 BuildConfig.java 的 packageName 是 Module 的 Package Name，即 AndroidManifest.xml 中的 package 属性，
     * 而 context.getPackageName() 得到的是应用的 applicationId，这个 applicationId 通过 build.gradle 是可以修改的。
     * 所以当 build.gradle 中的 applicationId 与 AndroidManifest.xml 中的 package 属性不一致时，上面的反射查找类路径便会出错。
     */
//    public static void syncIsDebug(Context context) {
//        if (isDebug == null) {
//            try {
//                String packageName = context.getPackageName();
//                Class buildConfig = Class.forName(packageName + ".BuildConfig");
//                Field DEBUG = buildConfig.getField("DEBUG");
//                DEBUG.setAccessible(true);
//                isDebug = DEBUG.getBoolean(null);
//            } catch (Throwable t) {
//                // Do nothing
//            }
//        }
//    }

    public static int i(String msg) {
        if (isDebug()) {
            Log.i(TAG, msg);
        }
        return -1;
    }

    public static int i(String msg, Object...args) {
        if (isDebug()) {
            if (args.length > 0) {
                msg = String.format(msg, args);
            }
            Log.i(TAG, msg);
        }
        return -1;
    }

    public static int w(String msg) {
        if (isDebug()) {
            Log.w(TAG, msg);
        }
        return -1;
    }

    public static int e(String msg) {
        if (isDebug()) {
            Log.e(TAG, msg);
        }
        return -1;
    }

    public static int v(String msg) {
        if (isDebug()) {
            Log.v(TAG, msg);
        }
        return -1;
    }

    public static int v(String msg, Object...args) {
        if (isDebug()) {
            if (args.length > 0) {
                msg = String.format(msg, args);
            }
            Log.v(TAG, msg);
        }
        return -1;
    }

    public static int d(String msg) {
        if (isDebug()) {
            Log.d(TAG, msg);
        }
        return -1;
    }

    public static int d(String msg, Object...args) {
        if (isDebug()) {
            if (args.length > 0) {
                msg = String.format(msg, args);
            }
            Log.d(TAG, msg);
        }
        return -1;
    }
}
