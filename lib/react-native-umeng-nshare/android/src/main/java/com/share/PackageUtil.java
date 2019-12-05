package com.share;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import java.util.List;

/**
 * Created by liupuyan on 2018/4/28.
 */

public class PackageUtil {

    /**
     * 通过包名，判断是否安装客户端，如：
     * 微信：com.tencent.mm
     * QQ：com.tencent.mobileqq
     * 微博：com.sina.weibo
     *
     * @return
     */
    public static boolean isClientAvilible(Context context, String packageName) {
        final PackageManager packageManager = context.getPackageManager();// 获取packagemanager
        List<PackageInfo> pinfo = packageManager.getInstalledPackages(0);// 获取所有已安装程序的包信息
        if (pinfo != null) {
            for (int i = 0; i < pinfo.size(); i++) {
                String pn = pinfo.get(i).packageName;
                if (pn.equals(packageName)) {
                    return true;
                }
            }
        }
        return false;
    }
}
