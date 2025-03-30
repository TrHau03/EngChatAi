import Foundation
import Speech

@objc(VoiceModule)
class VoiceModule: RCTEventEmitter, AVAudioRecorderDelegate {
    private var recordingSession: AVAudioSession = AVAudioSession.sharedInstance()
    private var audioRecorder: AVAudioRecorder?
    private var isRecording: Bool = false
    private var audioFilePath: URL?
    
    override init() {
        super.init()
      self.recordingSession = AVAudioSession.sharedInstance()
      requestPermission()
    }
    
    override static func moduleName() -> String! {
        return "VoiceModule"
    }
    
    override func supportedEvents() -> [String] {
        return ["onSpeechResults", "onSpeechStart", "onSpeechEnd", "onSpeechError", "onSpeechAvailabilityChanged"]
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc
    func startRecording(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard !isRecording else {
            reject("ALREADY_RECORDING", "Recording is already in progress", nil)
            return
        }
        audioFilePath = getDocumentsDirectory().appendingPathComponent("recording.m4a")
        guard let audioFilePath = audioFilePath else {
            reject("FILE_ERROR", "Failed to create file path", nil)
            return
        }
        
        let settings: [String: Any] = [
            AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
            AVSampleRateKey: 12000,
            AVNumberOfChannelsKey: 1,
            AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
        ]
        
        do {
            audioRecorder = try AVAudioRecorder(url: audioFilePath, settings: settings)
            audioRecorder?.delegate = self
            audioRecorder?.record()
            isRecording = true
            resolve("Recording started")
        } catch {
            reject("RECORDING_ERROR", "Failed to start recording", error)
        }
    }
    
    @objc
    func stopRecording(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard isRecording else {
            reject("NOT_RECORDING", "No active recording to stop", nil)
            return
        }
        
        audioRecorder?.stop()
        audioRecorder = nil
        isRecording = false
        if let filePath = audioFilePath?.path {
            resolve(["message": "Recording stopped", "filePath": filePath])
        } else {
            resolve(["message": "Recording stopped", "filePath": NSNull()])
        }
    }
    
    func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool) {
        if !flag {
            isRecording = false
        }
    }
    
    private func requestPermission() {
        do {
            try recordingSession.setCategory(.playAndRecord, mode: .default, options: .defaultToSpeaker)
            try recordingSession.setActive(true)
            recordingSession.requestRecordPermission { [weak self] allowed in
                DispatchQueue.main.async {
                    if !allowed {
                        self?.sendEvent(withName: "onSpeechError", body: ["error": "Permission denied"])
                    }
                }
            }
        } catch {
            sendEvent(withName: "onSpeechError", body: ["error": "Failed to set up session"])
        }
    }
    
    private func getDocumentsDirectory() -> URL {
        return FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
    }
}
