package com.push;

import android.app.Application;
import android.app.Notification;
import android.content.Context;
import android.os.Handler;

import com.reactlibrary.RNReactNativeUmengNpushModule;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.PushAgent;
import com.umeng.message.UmengMessageHandler;
import com.umeng.message.UmengNotificationClickHandler;
import com.umeng.message.entity.UMessage;

/**
 * Created by liupuyan on 2018/4/18.
 */

public class UmengPushApplication extends Application {

    protected RNReactNativeUmengNpushModule mPushModule;
    protected String mRegistrationId;
    protected PushAgent mPushAgent;
    //应用退出时，打开推送通知时临时保存的消息
    private UMessage tmpMessage;
    //应用退出时，打开推送通知时临时保存的事件
    private String tmpEvent;

    @Override
    public void onCreate() {
        super.onCreate();
    }

    /**
     * 开启推送
     */
    public void initPush(String packageString) {
        mPushAgent = PushAgent.getInstance(this);

        // Logcat有消息 通知栏收不到
        // 原因：包名与申请时所填的包名不一致，即applicationId和package不一致了，因此，消息无法传到。可以将包名设置成一致的，或者用自定义资源包名来实现
        // 自定义资源包名
        mPushAgent.setResourcePackageName(packageString);

        /**
         * 自定义行为的回调处理，参考文档：高级功能-通知的展示及提醒-自定义通知打开动作
         * UmengNotificationClickHandler是在BroadcastReceiver中被调用，故
         * 如果需启动Activity，需添加Intent.FLAG_ACTIVITY_NEW_TASK
         * */
        UmengNotificationClickHandler notificationClickHandler = new UmengNotificationClickHandler() {
            @Override
            public void launchApp(Context context, UMessage uMessage) {
                super.launchApp(context, uMessage);
                clikHandlerSendEvent(RNReactNativeUmengNpushModule.DidOpenMessage, uMessage);
            }

            @Override
            public void openUrl(Context context, UMessage uMessage) {
                super.openUrl(context, uMessage);
                clikHandlerSendEvent(RNReactNativeUmengNpushModule.DidOpenMessage, uMessage);
            }

            @Override
            public void openActivity(Context context, UMessage uMessage) {
                super.openActivity(context, uMessage);
                clikHandlerSendEvent(RNReactNativeUmengNpushModule.DidOpenMessage, uMessage);
            }

            /**
             * 若需要处理自定义行为，则可以重写方法dealWithCustomAction()
             * 自定义行为的数据放在UMessage.custom字段
             * @param context
             * @param uMessage
             */
            @Override
            public void dealWithCustomAction(Context context, UMessage uMessage) {
                super.dealWithCustomAction(context, uMessage);
                LogUtil.i("收到的推送数据：" + uMessage.custom);

                // 获取自定义参数
//                for (Map.Entry entry : uMessage.extra.entrySet()) {
//                    String key = entry.getKey().toString();
//                    String value = entry.getValue().toString();
//                }

                clikHandlerSendEvent(RNReactNativeUmengNpushModule.DidOpenMessage, uMessage);
            }
        };
        // 设置通知点击处理者
        mPushAgent.setNotificationClickHandler(notificationClickHandler);

        // 设置消息和通知的处理
        UmengMessageHandler messageHandler = new UmengMessageHandler() {
            /**
             * 自定义通知栏样式的回调方法
             * msg.builder_id是服务器下发的消息字段，用来指定通知消息的样式。可在【友盟+】Push网站上指定，默认值为0
             *
             * 每当有通知送达时，均会回调getNotification方法，因此可以通过监听此方法来判断通知是否送达
             */
            @Override
            public Notification getNotification(Context context, UMessage msg) {
                LogUtil.i("接收到通知：" + msg.custom);
                messageHandlerSendEvent(RNReactNativeUmengNpushModule.DidReceiveMessage, msg);
                return super.getNotification(context, msg);
            }

            /**
             * 通知的回调方法（通知送达时会回调）
             */
            @Override
            public void dealWithNotificationMessage(Context context, UMessage msg) {
                //调用super，会展示通知，不调用super，则不展示通知。
                super.dealWithNotificationMessage(context, msg);
                LogUtil.i("接收到通知啦：" + msg.custom);
                messageHandlerSendEvent(RNReactNativeUmengNpushModule.DidReceiveMessage, msg);
            }

            /**
             * 自定义消息的回调方法
             */
            @Override
            public void dealWithCustomMessage(final Context context, final UMessage msg) {
                LogUtil.i("自定义消息的回调方法：" + msg.custom);
            }
        };
        mPushAgent.setMessageHandler(messageHandler);

        // 通知栏按数量显示 数number可以设置为0~10之间任意整数。当参数为0时，表示不合并通知
        mPushAgent.setDisplayNotificationNumber(0);

        // 注册推送服务，每次调用register方法都会回调该接口
        mPushAgent.register(new IUmengRegisterCallback() {
            @Override
            public void onSuccess(String s) {
                LogUtil.i("注册成功，deviceToken:" + s);
                mRegistrationId = s;
            }

            @Override
            public void onFailure(String s, String s1) {
                LogUtil.i("注册失败，s:" + s + ", s1:" + s1);
            }
        });

        //统计应用启动数据
        mPushAgent.onAppStart();
    }

    public String getmRegistrationId() {
        return mRegistrationId;
    }

    public PushAgent getmPushAgent() {
        return mPushAgent;
    }

    public void setmPushModule(RNReactNativeUmengNpushModule mPushModule) {
        this.mPushModule = mPushModule;
        if (tmpMessage != null && tmpEvent != null && mPushModule != null) {
            //execute the task
            clikHandlerSendEvent(tmpEvent, tmpMessage);
            //发送事件之后，清空临时内容
            tmpEvent = null;
            tmpMessage = null;
        }
    }

    /**
     * 点击推送通知触发的事件
     * @param event
     * @param msg
     */
    private void clikHandlerSendEvent(final String event, final UMessage msg) {
        if(mPushModule == null) {
            tmpEvent = event;
            tmpMessage = msg;
            return;
        }
        //延时500毫秒发送推送，否则可能收不到
        new Handler().post(new Runnable() {
            public void run() {
                mPushModule.sendEvent(event, msg);
            }
        });
    }

    /**
     * 消息处理触发的事件
     * @param event
     * @param msg
     */
    private void messageHandlerSendEvent(String event, UMessage msg) {
        if(mPushModule == null) {
            return;
        }
        mPushModule.sendEvent(event, msg);
    }

    /**
     * 华为、小米、魅族推送
     * @param message
     */
    public void clickPlatformPushHandler(String message) {
        if(mPushModule == null) {
            return;
        }
        mPushModule.sendEvent(RNReactNativeUmengNpushModule.DidOpenMessage, message);
    }
}
