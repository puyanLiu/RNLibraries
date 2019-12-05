using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Umeng.Npush.RNReactNativeUmengNpush
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeUmengNpushModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeUmengNpushModule"/>.
        /// </summary>
        internal RNReactNativeUmengNpushModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeUmengNpush";
            }
        }
    }
}
