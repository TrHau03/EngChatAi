 #import <React/RCTBridgeModule.h>
 #import <React/RCTEventEmitter.h>

 @interface VoiceEmitterModule : RCTEventEmitter <RCTBridgeModule>

 @end

 @interface RCT_EXTERN_MODULE(VoiceModule, NSObject)
 RCT_EXTERN_METHOD(startRecording:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
 RCT_EXTERN_METHOD(stopRecording:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
 @end
	
