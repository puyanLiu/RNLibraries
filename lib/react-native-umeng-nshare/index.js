
import { NativeModules } from 'react-native';

const { RNUmengShare } = NativeModules;

// export default RNUmengShare;

var UmengShare = {
    supportPlatform(handler) {
        RNUmengShare.supportPlatform(handler);
    },
    umengShare(title, content,imgUrl, url, handler) {
        RNUmengShare.umengShare(title, content, imgUrl, url, handler);
    },
};

export default UmengShare;
