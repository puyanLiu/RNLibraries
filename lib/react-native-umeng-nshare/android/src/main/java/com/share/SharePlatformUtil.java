package com.share;

import android.app.Activity;
import android.content.Context;

import com.reactlibrary.R;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.media.UMMin;
import com.umeng.socialize.media.UMVideo;
import com.umeng.socialize.media.UMWeb;
import com.umeng.socialize.media.UMusic;

/**
 * Created by liupuyan on 2018/4/16.
 *
 * 页面调用需调用如下几个方法
 protected void onActivityResult(int requestCode, int resultCode, Intent data) {
     super.onActivityResult(requestCode, resultCode, data);
     // attention to this below ,must add this
     UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
 }
 */

public class SharePlatformUtil {
    /**
     * 纯文本
     * @param activity
     * @param share_media
     * @param shareListener
     */
    public static void shareText(Activity activity, SHARE_MEDIA share_media, UMShareListener shareListener) {
        new ShareAction(activity).withText(ShareDefaultContent.text)
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }

    /**
     * 纯图片本地
     * @param activity
     * @param context
     * @param share_media
     * @param shareListener
     */
    public static void shareImageLocal(Activity activity, Context context, SHARE_MEDIA share_media, UMShareListener shareListener){
        UMImage imagelocal = new UMImage(context, R.mipmap.login_logo);
        imagelocal.setThumb(new UMImage(context, R.mipmap.login_logo));
        new ShareAction(activity).withMedia(imagelocal)
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }

    /**
     * 纯图片网络
     * @param activity
     * @param context
     * @param share_media
     * @param shareListener
     */
    public void shareImageNet(Activity activity, Context context, SHARE_MEDIA share_media, UMShareListener shareListener){
        UMImage imageurl = new UMImage(context, ShareDefaultContent.imageurl);
        imageurl.setThumb(new UMImage(context, R.mipmap.login_logo));
        new ShareAction(activity).withMedia(imageurl)
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }

    /**
     * 链接（有标题，有内容）
     * @param activity
     * @param context
     * @param share_media
     * @param shareListener
     */
    public static void shareUrl(Activity activity, Context context, SHARE_MEDIA share_media, String title, String desc, String url, String thumbUrl, UMShareListener shareListener){
        UMWeb web = new UMWeb(url != null ? url : ShareDefaultContent.url);
        web.setTitle(title != null ? title : ShareDefaultContent.title);
        UMImage imageurl = new UMImage(context, thumbUrl);
        web.setThumb(thumbUrl != null ? imageurl : new UMImage(context, R.mipmap.login_logo));
        web.setDescription(desc != null ? desc : ShareDefaultContent.text);
        new ShareAction(activity).withMedia(web)
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }

    /**
     * 音乐（有标题，有内容）
     * @param activity
     * @param context
     * @param share_media
     * @param shareListener
     */
    public static void shareMusic(Activity activity, Context context, SHARE_MEDIA share_media, UMShareListener shareListener){
        UMusic music = new UMusic(ShareDefaultContent.musicurl);
        music.setTitle("This is music title");
        music.setThumb(new UMImage(context, R.mipmap.login_logo));
        music.setDescription("my description");
        music.setmTargetUrl(ShareDefaultContent.url);
        new ShareAction(activity).withMedia(music )
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }

    /**
     * 视频（有标题，有内容）
     * @param activity
     * @param context
     * @param share_media
     * @param shareListener
     */
    public static void shareVideo(Activity activity, Context context, SHARE_MEDIA share_media, UMShareListener shareListener){
        UMVideo video = new UMVideo(ShareDefaultContent.videourl);
        video.setThumb(new UMImage(context, R.mipmap.login_logo));
        video.setTitle("This is video title");
        video.setDescription("my description");
        new ShareAction(activity).withMedia(video )
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }

    /**
     * 图文
     * @param activity
     * @param context
     * @param share_media
     * @param shareListener
     */
    public static void shareTextAndImage(Activity activity, Context context, SHARE_MEDIA share_media, UMShareListener shareListener){
        UMImage imagelocal = new UMImage(context, R.mipmap.login_logo);
        imagelocal.setThumb(new UMImage(context, R.mipmap.login_logo));
        new ShareAction(activity).withText(ShareDefaultContent.text)
                .withMedia(imagelocal)
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }

    /**
     * 小程序
     * @param activity
     * @param context
     * @param share_media
     * @param shareListener
     */
    public static void shareMINApp(Activity activity, Context context, SHARE_MEDIA share_media, UMShareListener shareListener){
        UMMin umMin = new UMMin(ShareDefaultContent.url);
        umMin.setThumb(new UMImage(context, R.mipmap.login_logo));
        umMin.setTitle(ShareDefaultContent.title);
        umMin.setDescription(ShareDefaultContent.text);
        umMin.setPath("pages/page10007/page10007");
        umMin.setUserName("gh_3ac2059ac66f");
        new ShareAction(activity)
                .withMedia(umMin)
                .setPlatform(share_media)
                .setCallback(shareListener).share();
    }
}
