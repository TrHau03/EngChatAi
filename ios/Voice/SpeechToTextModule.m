#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface SpeechToTextEmitterModule : RCTEventEmitter <RCTBridgeModule>

@end

@interface RCT_EXTERN_MODULE(SpeechToTextModule, NSObject)
RCT_EXTERN_METHOD(startListening:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopListening:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)
@end
