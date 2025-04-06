#import <React/RCTBridgeModule.h>

 @interface RCT_EXTERN_MODULE(AudioPlayerModule, NSObject)

 RCT_EXTERN_METHOD(initialize:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(setupAudioSession:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(loadSound:(NSString *)soundName
                   soundUrl:(NSString *)soundUrl
                   resolver:(RCTPromiseResoalveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(play:(NSString *)soundName
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(playFromPosition:(NSString *)soundName
                   position:(double)position
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(stop:(NSString *)soundName
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(stopAllSounds:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(pause:(NSString *)soundName
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(resume:(NSString *)soundName
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(setVolume:(NSString *)soundName
                   volume:(float)volume
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(getStatus:(NSString *)soundName
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(getCurrentlyPlayingSound:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(unloadSound:(NSString *)soundName
                   resolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(unloadAllSounds:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(deactivateAudioSession:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 RCT_EXTERN_METHOD(cleanup:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)

 @end
