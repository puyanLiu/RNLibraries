package com.share;

import android.content.Context;
import android.widget.Toast;

/**
 * Created by liupuyan on 2017/10/28.
 */

public class ToastUtil {

    public static void showSystemToast(Context context, String message) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
    }
}
