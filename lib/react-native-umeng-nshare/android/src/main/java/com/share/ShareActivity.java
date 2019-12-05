package com.share;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.RelativeLayout;

import com.reactlibrary.R;
import com.umeng.socialize.UMShareAPI;

/**
 * Created by liupuyan on 2018/4/27.
 */

public class ShareActivity extends Activity {
    private RelativeLayout rlContainer;
    private String title;
    private String content;
    private String imgUrl;
    private String url;
    private ShareView shareView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share);
        rlContainer = (RelativeLayout)findViewById(R.id.rl_container);
        Intent intent = getIntent();
        Bundle bundle = intent.getExtras();
        title = bundle.getString("title");
        content = bundle.getString("content");
        imgUrl = bundle.getString("imgUrl");
        url = bundle.getString("url");
    }

    @Override
    protected void onStart() {
        super.onStart();

        if (shareView != null && shareView.getDialog() != null && shareView.getDialog().isShowing()) {
            finish();
        }

        if (shareView == null) {
            share();
        }
    }

    private void share() {
        shareView = new ShareView(this, this);
        shareView.setTitle(title).setContent(content).setImgUrl(imgUrl).setUrl(url);
        shareView.setOnShareViewListener(new ShareView.OnShareViewListener() {
            @Override
            public void onCloseClick() {
                Animation animation = AnimationUtils.loadAnimation(ShareActivity.this, R.anim.share_hide_translate);
                shareView.startAnimation(animation);
                rlContainer.removeView(shareView);
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        finish();
                    }
                }, 200);
            }

            @Override
            public void onSuccess() {
                Intent intent = new Intent();
                intent.putExtra("message", "成功了");
                intent.putExtra("isSuccess", true);
                setResult(RESULT_OK, intent);
                finish();
            }

            @Override
            public void onError(String message) {
                Intent intent = new Intent();
                intent.putExtra("message", message);
                intent.putExtra("isSuccess", false);
                setResult(RESULT_OK, intent);
                finish();
            }
        });
        rlContainer.addView(shareView);
        Animation animation = AnimationUtils.loadAnimation(this, R.anim.share_show_translate);
        shareView.startAnimation(animation);
    }

    /**
     * QQ不需要添加Activity，但需要在使用QQ分享或者授权的Activity中
     *
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }
}
