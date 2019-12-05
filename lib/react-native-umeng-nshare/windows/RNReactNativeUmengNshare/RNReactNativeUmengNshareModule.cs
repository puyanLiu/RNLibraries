using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Umeng.Nshare.RNReactNativeUmengNshare
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeUmengNshareModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeUmengNshareModule"/>.
        /// </summary>
        internal RNReactNativeUmengNshareModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeUmengNshare";
            }
        }
    }
}
