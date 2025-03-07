import Foundation
import React
import Speech


@objc(SpeechToTextModule)
class SpeechToTextModule: NSObject,RCTBridgeModule, SFSpeechRecognizerDelegate {
  static func moduleName() -> String! {
    return "SpeechToTextModule"
  }
  var hasCalledCallback = false
  private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "en_US"))
  private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
  private var recognitionTask: SFSpeechRecognitionTask?
  private let audioEngine = AVAudioEngine()
  
  @objc
  func requestPermission(_ callback: @escaping RCTResponseSenderBlock){
    SFSpeechRecognizer.requestAuthorization{ status in
      DispatchQueue.main.async {
        switch status{
        case .authorized:
          callback([NSNull(), true])
        default:
          callback(["Permisstion denied", NSNull()])
        }
      }
    }
  }
  
  @objc
func startListening(_ callback: @escaping RCTResponseSenderBlock) {
    // Kiểm tra quyền trước khi chạy
    guard SFSpeechRecognizer.authorizationStatus() == .authorized else {
        callback(["Speech recognition permission not granted", NSNull()])
        return
    }
    
    // Kiểm tra nếu đã chạy trước đó
    if audioEngine.isRunning {
        stopListening()
      audioEngine.inputNode.removeTap(onBus: 0)
    }
    
    do {
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        guard let recognitionRequest = recognitionRequest else {
            callback(["Failed to create recognition request", NSNull()])
            return
        }

        let audioSession = AVAudioSession.sharedInstance()
        try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
        try audioSession.setActive(true, options: .notifyOthersOnDeactivation)

        let node = audioEngine.inputNode
        let recordingFormat = node.outputFormat(forBus: 0)
        node.removeTap(onBus: 0)
        node.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { (buffer, _) in
            self.recognitionRequest?.append(buffer)
        }

        audioEngine.prepare()
        try audioEngine.start()

        recognitionRequest.shouldReportPartialResults = true
      recognitionRequest.requiresOnDeviceRecognition = false
      recognitionTask = speechRecognizer?.recognitionTask(with: recognitionRequest) { result, error in
          if let result = result {
              let bestString = result.bestTranscription.formattedString
            if !self.hasCalledCallback {
              self.hasCalledCallback = true
                  callback([NSNull(), bestString])
                  DispatchQueue.main.async {
                      self.stopListening()
                  }
              }
          } else if let error = error {
            if !self.hasCalledCallback {
              self.hasCalledCallback = true
                  callback([error.localizedDescription, NSNull()])
              }
          }
      }
    } catch {
        callback(["Audio engine start error: \(error.localizedDescription)", NSNull()])
    }
}
  
  @objc
  func stopListening() {
      audioEngine.stop()
      audioEngine.inputNode.removeTap(onBus: 0)
      recognitionRequest?.endAudio()
      recognitionTask?.cancel()
      recognitionRequest = nil
      recognitionTask = nil
  }
  
  @objc
     static func requiresMainQueueSetup() -> Bool {
         return true
     }
}
