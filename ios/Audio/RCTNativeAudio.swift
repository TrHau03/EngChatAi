 // AudioPlayerModule.swift

 import Foundation
 import AVFoundation

 @objc(AudioPlayerModule)
 class AudioPlayerModule: NSObject {
    
     private var audioPlayers: [String: AVAudioPlayer] = [:]
     private var isAudioSessionActive = false
     private var currentlyPlayingSound: String? = nil
     private var isInitialized = false
    
     @objc static func requiresMainQueueSetup() -> Bool {
         return false
     }
    
     @objc func initialize(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         do {
             try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
             try AVAudioSession.sharedInstance().setActive(true)
             isAudioSessionActive = true
             isInitialized = true
             resolve(true)
         } catch {
             reject("INITIALIZATION_ERROR", "Failed to initialize audio module: \(error.localizedDescription)", error)
         }
     }
    
     private func ensureInitialized() -> Bool {
         if !isInitialized {
             do {
                 try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
                 try AVAudioSession.sharedInstance().setActive(true)
                 isAudioSessionActive = true
                 isInitialized = true
                 return true
             } catch {
                 print("Failed to auto-initialize audio module: \(error.localizedDescription)")
                 return false
             }
         }
         return true
     }
    
     @objc func setupAudioSession(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         do {
             try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
             try AVAudioSession.sharedInstance().setActive(true)
             isAudioSessionActive = true
             resolve(true)
         } catch {
             reject("AUDIO_SESSION_ERROR", "Failed to setup audio session: \(error.localizedDescription)", error)
         }
     }
    
     @objc func loadSound(_ soundName: String, soundUrl: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         // Handle URL (remote or local)
         var url: URL?
        
         if soundUrl.hasPrefix("http://") || soundUrl.hasPrefix("https://") {
             // Remote URL
             url = URL(string: soundUrl)
         } else {
             // Local resource
             let resourcePath = soundUrl.components(separatedBy: ".")
             if resourcePath.count == 2 {
                 let resourceName = resourcePath[0]
                 let resourceType = resourcePath[1]
                 url = Bundle.main.url(forResource: resourceName, withExtension: resourceType)
             } else {
                 url = Bundle.main.url(forResource: soundUrl, withExtension: nil)
             }
         }
        
         guard let soundURL = url else {
             reject("INVALID_URL", "Invalid sound URL provided", nil)
             return
         }
        
         do {
             if soundUrl.hasPrefix("http://") || soundUrl.hasPrefix("https://") {
                 // For remote files, download first
                 let task = URLSession.shared.dataTask(with: soundURL) { data, response, error in
                     if let error = error {
                         DispatchQueue.main.async {
                             reject("DOWNLOAD_ERROR", "Failed to download sound: \(error.localizedDescription)", error)
                         }
                         return
                     }
                    
                     guard let data = data else {
                         DispatchQueue.main.async {
                             reject("DOWNLOAD_ERROR", "No data received", nil)
                         }
                         return
                     }
                    
                     do {
                         let player = try AVAudioPlayer(data: data)
                         player.prepareToPlay()
                         self.audioPlayers[soundName] = player
                         DispatchQueue.main.async {
                             resolve(["duration": player.duration, "loaded": true])
                         }
                     } catch {
                         DispatchQueue.main.async {
                             reject("LOAD_ERROR", "Failed to load sound: \(error.localizedDescription)", error)
                         }
                     }
                 }
                 task.resume()
             } else {
                 // Local file
                 let player = try AVAudioPlayer(contentsOf: soundURL)
                 player.prepareToPlay()
                 audioPlayers[soundName] = player
                 resolve(["duration": player.duration, "loaded": true])
             }
         } catch {
             reject("LOAD_ERROR", "Failed to load sound: \(error.localizedDescription)", error)
         }
     }
    
     @objc func play(_ soundName: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard let player = audioPlayers[soundName] else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         // Stop currently playing sound if any
         if let currentSound = currentlyPlayingSound, let currentPlayer = audioPlayers[currentSound] {
             currentPlayer.stop()
         }
        
         player.currentTime = 0
         let playResult = player.play()
        
         if playResult {
             currentlyPlayingSound = soundName
             resolve(true)
         } else {
             reject("PLAY_ERROR", "Failed to play sound", nil)
         }
     }
    
     @objc func playFromPosition(_ soundName: String, position: Double, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard let player = audioPlayers[soundName] else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         // Stop currently playing sound if any
         if let currentSound = currentlyPlayingSound, let currentPlayer = audioPlayers[currentSound] {
             currentPlayer.stop()
         }
        
         player.currentTime = position
         let playResult = player.play()
        
         if playResult {
             currentlyPlayingSound = soundName
             resolve(true)
         } else {
             reject("PLAY_ERROR", "Failed to play sound from position", nil)
         }
     }
    
     @objc func stop(_ soundName: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard let player = audioPlayers[soundName] else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         player.stop()
         if currentlyPlayingSound == soundName {
             currentlyPlayingSound = nil
         }
         resolve(true)
     }
    
     @objc func pause(_ soundName: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard let player = audioPlayers[soundName] else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         player.pause()
         resolve(true)
     }
    
     @objc func resume(_ soundName: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard let player = audioPlayers[soundName] else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         // Stop currently playing sound if any and different from the one we want to resume
         if let currentSound = currentlyPlayingSound, currentSound != soundName, let currentPlayer = audioPlayers[currentSound] {
             currentPlayer.stop()
         }
        
         let playResult = player.play()
        
         if playResult {
             currentlyPlayingSound = soundName
             resolve(true)
         } else {
             reject("RESUME_ERROR", "Failed to resume playback", nil)
         }
     }
    
     @objc func setVolume(_ soundName: String, volume: Float, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard let player = audioPlayers[soundName] else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         player.volume = max(0.0, min(1.0, volume))
         resolve(true)
     }
    
     @objc func getStatus(_ soundName: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard let player = audioPlayers[soundName] else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         let status: [String: Any] = [
             "duration": player.duration,
             "currentPosition": player.currentTime,
             "isPlaying": player.isPlaying,
             "volume": player.volume,
             "isCurrentlyActive": soundName == currentlyPlayingSound
         ]
        
         resolve(status)
     }
    
     @objc func getCurrentlyPlayingSound(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         if let currentSound = currentlyPlayingSound {
             resolve(currentSound)
         } else {
             resolve(NSNull())
         }
     }
    
     @objc func stopAllSounds(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         for (_, player) in audioPlayers {
             player.stop()
         }
         currentlyPlayingSound = nil
         resolve(true)
     }
    
     @objc func unloadSound(_ soundName: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         guard audioPlayers[soundName] != nil else {
             reject("SOUND_NOT_FOUND", "Sound with name \(soundName) has not been loaded", nil)
             return
         }
        
         if currentlyPlayingSound == soundName {
             audioPlayers[soundName]?.stop()
             currentlyPlayingSound = nil
         }
        
         audioPlayers.removeValue(forKey: soundName)
         resolve(true)
     }
    
     @objc func unloadAllSounds(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         for (_, player) in audioPlayers {
             player.stop()
         }
         audioPlayers.removeAll()
         currentlyPlayingSound = nil
         resolve(true)
     }
    
     @objc func deactivateAudioSession(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         // Ensure module is initialized
         if !ensureInitialized() {
             reject("NOT_INITIALIZED", "Audio module not initialized. Call initialize() first", nil)
             return
         }
        
         do {
             try AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
             isAudioSessionActive = false
             resolve(true)
         } catch {
             reject("AUDIO_SESSION_ERROR", "Failed to deactivate audio session: \(error.localizedDescription)", error)
         }
     }
    
     @objc func cleanup(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
         for (_, player) in audioPlayers {
             player.stop()
         }
         audioPlayers.removeAll()
         currentlyPlayingSound = nil
        
         do {
             try AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
             isAudioSessionActive = false
             isInitialized = false
             resolve(true)
         } catch {
             reject("CLEANUP_ERROR", "Failed during cleanup: \(error.localizedDescription)", error)
         }
     }
 }
