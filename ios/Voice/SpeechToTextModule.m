#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SpeechToTextModule, NSObject)
RCT_EXTERN_METHOD(requestPermission:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(startListening:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(stopListening)
@end
