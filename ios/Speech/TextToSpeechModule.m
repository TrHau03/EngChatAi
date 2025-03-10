#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface TextToSpeechEmitterModule : RCTEventEmitter <RCTBridgeModule>

@end

@interface RCT_EXTERN_MODULE(TextToSpeechModule, NSObject)

RCT_EXTERN_METHOD(speak:(NSString *)text
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stop:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setDefaultLanguage:(NSString *)language)
RCT_EXTERN_METHOD(setDefaultRate:(NSNumber *)rate)
RCT_EXTERN_METHOD(setDefaultPitch:(NSNumber *)pitch)

@end
