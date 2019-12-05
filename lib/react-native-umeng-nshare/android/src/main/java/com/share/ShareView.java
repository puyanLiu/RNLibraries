package com.share;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.reactlibrary.R;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.utils.SocializeUtils;

/**
 * Created by liupuyan on 2018/4/16.
 */

public class ShareView extends RelativeLayout implements View.OnClickListener {
    private ImageView imgClose;
    private TextView txtWechat;
    private TextView txtCircle;
    private TextView txtQq;
    private TextView txtQzone;
    private Context context;
    private Activity activity;
    private ProgressDialog dialog;
    private String title;
    private String content;
    private String imgUrl;
    private String url;

    private OnShareViewListener onShareViewListener;

    public ShareView(Activity activity, Context context) {
        this(activity, context, null);
    }

    public ShareView(Activity activity, Context context, AttributeSet attrs) {
        this(activity, context, attrs, 0);
    }

    public ShareView(Activity activity, Context context, AttributeSet attrs, int defStyleAttr) {
        this(activity, context, attrs, defStyleAttr, 0);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public ShareView(Activity activity, Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        initView(activity, context, attrs);
    }

    public ProgressDialog getDialog() {
        return dialog;
    }

    private void initView(Activity activity, Context context, AttributeSet attrs) {
        this.context = context;
        this.activity = activity;
        dialog = new ProgressDialog(context);
        View child = View.inflate(context, R.layout.view_share, null);
        this.addView(child);

        imgClose = (ImageView)child.findViewById(R.id.img_close);
        txtWechat = (TextView)child.findViewById(R.id.txt_wechat);
        txtCircle = (TextView)child.findViewById(R.id.txt_circle);
        txtQq = (TextView)child.findViewById(R.id.txt_qq);
        txtQzone = (TextView)child.findViewById(R.id.txt_qzone);

        if (!PackageUtil.isClientAvilible(getContext(), "com.tencent.mm")) {
            txtWechat.setVisibility(GONE);
            txtCircle.setVisibility(GONE);
        }
        if (!PackageUtil.isClientAvilible(getContext(), "com.tencent.mobileqq")) {
            txtQq.setVisibility(GONE);
            txtQzone.setVisibility(GONE);
        }

        imgClose.setOnClickListener(this);
        txtWechat.setOnClickListener(this);
        txtCircle.setOnClickListener(this);
        txtQq.setOnClickListener(this);
        txtQzone.setOnClickListener(this);

        if (attrs == null)
            return;
    }

    @Override
    public void onClick(View v) {
        int id = v.getId();
        if (id == R.id.img_close) {
            close();
        } else if (id == R.id.txt_wechat) {
            share(SHARE_MEDIA.WEIXIN);
        } else if (id == R.id.txt_circle) {
            share(SHARE_MEDIA.WEIXIN_CIRCLE);
        } else if (id == R.id.txt_qq) {
            share(SHARE_MEDIA.QQ);
        } else if (id == R.id.txt_qzone) {
            share(SHARE_MEDIA.QZONE);
        }
    }

    public ShareView setTitle(String title) {
        this.title = title;
        return this;
    }

    public ShareView setContent(String content) {
        this.content = content;
        return this;
    }

    public ShareView setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
        return this;
    }

    public ShareView setUrl(String url) {
        this.url = url;
        return this;
    }

    private void share(SHARE_MEDIA share_media) {
        SharePlatformUtil.shareUrl(this.activity, this.context, share_media, title, content, url, imgUrl, shareListener);
    }

    public void setOnShareViewListener(OnShareViewListener onShareViewListener) {
        this.onShareViewListener = onShareViewListener;
    }

    public void close() {
        if (onShareViewListener != null) {
            onShareViewListener.onCloseClick();
        }
    }

    public interface OnShareViewListener {
        void onCloseClick();
        void onSuccess();
        void onError(String message);
    }

    private UMShareListener shareListener = new UMShareListener() {
        @Override
        public void onStart(SHARE_MEDIA platform) {
            SocializeUtils.safeShowDialog(dialog);
        }

        @Override
        public void onResult(SHARE_MEDIA platform) {
            SocializeUtils.safeCloseDialog(dialog);
            ToastUtil.showSystemToast(context, "成功了");
            if (onShareViewListener != null) {
                onShareViewListener.onSuccess();
            }
        }

        @Override
        public void onError(SHARE_MEDIA platform, Throwable t) {
            SocializeUtils.safeCloseDialog(dialog);
            ToastUtil.showSystemToast(context, "失败" + t.getMessage());
            if (onShareViewListener != null) {
                onShareViewListener.onError("失败" + t.getMessage());
            }
        }

        @Override
        public void onCancel(SHARE_MEDIA platform) {
            SocializeUtils.safeCloseDialog(dialog);
            ToastUtil.showSystemToast(context, "取消了");
            if (onShareViewListener != null) {
                onShareViewListener.onError("取消了");
            }
        }
    };
}
