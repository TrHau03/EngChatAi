import Foundation
import Speech

@objc(SpeechToTextModule)
class SpeechToTextModule: RCTEventEmitter, SFSpeechRecognizerDelegate {
  override static func moduleName() -> String! {
    return "SpeechToTextModule"
  }

  private var audioEngine: AVAudioEngine?
  private var speechRecognizer: SFSpeechRecognizer?
  private var request: SFSpeechAudioBufferRecognitionRequest?
  private var recognitionTask: SFSpeechRecognitionTask?
  private var isListening: Bool = false
  private var idleTimer: Timer?
  
  override init() {
    super.init()
    speechRecognizer = SFSpeechRecognizer()
    speechRecognizer?.delegate = self
    self.requestSpeechAuthorization{result in
        
    }
  }
  
  @objc
  override func supportedEvents() -> [String] {
    return ["onSpeechResults", "onSpeechStart", "onSpeechEnd", "onSpeechError", "onSpeechAvailabilityChanged"]
  }
  
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func startListening(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    
    //Prevent starting if already listening
    guard !isListening else {
      reject("ALREADY_LISTENING", "Speech recognition is already in progress.", nil)
      return
    }
    
    requestSpeechAuthorization { granted in
        if granted {
            self.startRecording(resolve: resolve, reject: reject)
        } else {
            reject("PERMISSION_DENIED", "Speech recognition permission was not granted.", nil)
        }
    }
  }
    
  fileprivate func startRecording(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock){
    do {
        try self.startAudioEngine()
        resolve(true) // Indicate successful start
    } catch {
        reject("AUDIO_ENGINE_ERROR", "Failed to start audio engine: \(error)", error)
    }
  }

  @objc
  func stopListening(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    stopRecording()
    resolve(true)
  }
    
  fileprivate func requestSpeechAuthorization(completion: @escaping (Bool) -> Void){
        SFSpeechRecognizer.requestAuthorization { authStatus in
            DispatchQueue.main.async {
                switch authStatus {
                case .authorized:
                    completion(true)
                case .denied, .restricted, .notDetermined:
                    completion(false)
                @unknown default:
                    completion(false)
                }
            }
        }
    }

  private func startAudioEngine() throws {
      if let recognitionTask = recognitionTask {
        recognitionTask.cancel()
        self.recognitionTask = nil
      }

      let audioSession = AVAudioSession.sharedInstance()
      try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
      try audioSession.setActive(true, options: .notifyOthersOnDeactivation)

      // Create the speech recognition request
      request = SFSpeechAudioBufferRecognitionRequest()
      request?.shouldReportPartialResults = true

      // Get the audio engine and input node
      audioEngine = AVAudioEngine()
      let inputNode = audioEngine!.inputNode

      // Configure the audio format
      let recordingFormat = inputNode.outputFormat(forBus: 0)
      inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { (buffer: AVAudioPCMBuffer, when: AVAudioTime) in
        self.request?.append(buffer)
        self.resetIdleTimer() // Reset the idle timer every time audio data is received
      }

      //Set isListening to true, to prevent multiple start attempts
      isListening = true

      // Create and start the recognition task
      recognitionTask = speechRecognizer?.recognitionTask(with: request!) { (result, error) in
        var isFinal = false

        if let result = result {
          // Send the transcript to React Native
          self.sendEvent(withName: "onSpeechResults", body: ["text": result.bestTranscription.formattedString])
          isFinal = result.isFinal
        }

        if error != nil || isFinal {
          self.stopRecording()
        }
      }

      // Prepare and start audio engine
      audioEngine?.prepare()
      try audioEngine?.start()

      self.sendEvent(withName: "onSpeechStart", body: nil) // Send Start event
      print("Speech recognition started")

      startIdleTimer() // Start the idle timer when speech recognition begins
    }
  


   private func startIdleTimer() {
     idleTimer = Timer.scheduledTimer(timeInterval: 5.0, target: self, selector: #selector(idleTimerExceeded), userInfo: nil, repeats: false)
   }

   private func resetIdleTimer() {
     idleTimer?.invalidate()
     idleTimer = Timer.scheduledTimer(timeInterval: 5.0, target: self, selector: #selector(idleTimerExceeded), userInfo: nil, repeats: false)
   }

   @objc private func idleTimerExceeded() {
     print("5 seconds of silence detected. Stopping recording.")
     stopRecording()
   }


  private func stopRecording() {
    audioEngine?.stop()
    request?.endAudio()
    audioEngine?.inputNode.removeTap(onBus: 0)

    recognitionTask?.cancel()
    recognitionTask = nil
    
    isListening = false

    self.sendEvent(withName: "onSpeechEnd", body: nil) // Send End event
    print("Speech recognition stopped")
  }

  func speechRecognizer(_ speechRecognizer: SFSpeechRecognizer, availabilityDidChange available: Bool) {
    // Handle speech recognizer availability changes (e.g., network connectivity issues)
    if available {
      print("Speech recognizer is available.")
    } else {
      print("Speech recognizer is unavailable.")
      self.sendEvent(withName: "onSpeechAvailabilityChanged", body: ["available": available])
    }
  }


}
