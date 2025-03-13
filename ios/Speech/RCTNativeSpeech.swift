import Foundation
import React
import Speech


@objc(TextToSpeechModule)
class TextToSpeechModule: RCTEventEmitter , SFSpeechRecognizerDelegate, AVSpeechSynthesizerDelegate {
  override init() {
      super.init()
    }
  
  override func supportedEvents() -> [String]! {
      return ["onSpeechStart", "onSpeechEnd"]
    }
  
  override static func moduleName() -> String! {
    return "TextToSpeechModule"
  }

  
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  var isSpeaking: Bool = false
  var language: String = "en-US"
  var rate: Float = 0.5
  var pitch: Float = 1.0
  let synthesizer = AVSpeechSynthesizer()
  
  @objc
  func setDefaultLanguage(_ language: String) {
    self.language = language
  }
  
  @objc
  func setDefaultRate(_ rate: NSNumber) {
    self.rate = rate.floatValue
  }
  
  @objc
  func setDefaultPitch(_ pitch: NSNumber) {
    self.pitch = pitch.floatValue
  }

  @objc
  func speak(_ text: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    if isSpeaking {
      reject("SPEAKING_ERROR", "Already speaking", nil)
      return
    }

    isSpeaking = true

    let utterance = AVSpeechUtterance(string: text)
    utterance.voice = AVSpeechSynthesisVoice(language: self.language)
    utterance.rate = self.rate
    utterance.pitchMultiplier = self.pitch

    synthesizer.delegate = self

    synthesizer.speak(utterance)
    self.sendEvent(withName: "onSpeechStart", body: nil)
    resolve(true)
  }

  @objc
  func stop(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    if !isSpeaking {
        reject("STOPPING_ERROR", "Not speaking", nil)
        return
    }

    synthesizer.stopSpeaking(at: .immediate)
    isSpeaking = false
    self.sendEvent(withName: "onSpeechEnd", body: nil)
    resolve(true)
  }
  func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
    self.sendEvent(withName: "onSpeechEnd", body: ["message": "endMessage"])
   }
}
