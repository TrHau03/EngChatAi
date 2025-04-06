import { NativeModules } from "react-native"
import { logger } from "../utils"
const { AudioPlayerModule } = NativeModules

class AudioPlayer {
    /**
     * Initialize the audio module (required before using other methods)
     * @returns {Promise<boolean>}
     */
    static initialize() {
        return AudioPlayerModule.initialize()
    }

    /**
     * Set up the audio session for playback
     * @returns {Promise<boolean>}
     */
    static setupAudioSession() {
        return AudioPlayerModule.setupAudioSession()
    }

    /**
     * Load a sound file
     * @param {string} name - Unique identifier for the sound
     * @param {string} url - Local path or remote URL for the sound file
     * @returns {Promise<Object>} - Contains duration and loaded status
     */
    static loadSound(name: string, url: string): Promise<{ duration: number; loaded: boolean }> {
        logger.info("Audio", name)
        return AudioPlayerModule.loadSound(name, url)
    }

    /**
     * Play a sound from the beginning
     * (Will stop any currently playing sound)
     * @param {string} name - Identifier of the sound to play
     * @returns {Promise<boolean>}
     */
    static play(name: string) {
        try {
            return AudioPlayerModule.play(name)
        } catch (error) {
            console.error("Error playing sound:", error)
            return false
        }
    }

    /**
     * Play a sound from a specific position
     * (Will stop any currently playing sound)
     * @param {string} name - Identifier of the sound to play
     * @param {number} position - Position in seconds to start playback from
     * @returns {Promise<boolean>}
     */
    static playFromPosition(name: string, position: string): Promise<boolean> {
        return AudioPlayerModule.playFromPosition(name, position)
    }

    /**
     * Stop a sound
     * @param {string} name - Identifier of the sound to stop
     * @returns {Promise<boolean>}
     */
    static stop(name: string): Promise<boolean> {
        return AudioPlayerModule.stop(name)
    }

    /**
     * Stop all sounds
     * @returns {Promise<boolean>}
     */
    static stopAllSounds(): Promise<boolean> {
        return AudioPlayerModule.stopAllSounds()
    }

    /**
     * Pause a sound
     * @param {string} name - Identifier of the sound to pause
     * @returns {Promise<boolean>}
     */
    static pause(name: string): Promise<boolean> {
        return AudioPlayerModule.pause(name)
    }

    /**
     * Resume a paused sound
     * (Will stop any other currently playing sound)
     * @param {string} name - Identifier of the sound to resume
     * @returns {Promise<boolean>}
     */
    static resume(name: string): Promise<boolean> {
        return AudioPlayerModule.resume(name)
    }

    /**
     * Set the volume for a specific sound
     * @param {string} name - Identifier of the sound
     * @param {number} volume - Volume level (0.0 to 1.0)
     * @returns {Promise<boolean>}
     */
    static setVolume(name: string, volume: number): Promise<boolean> {
        return AudioPlayerModule.setVolume(name, volume)
    }

    /**
     * Get the status of a sound
     * @param {string} name - Identifier of the sound
     * @returns {Promise<Object>} - Contains duration, currentPosition, isPlaying, volume, and isCurrentlyActive
     */
    static getStatus(name: string) {
        return AudioPlayerModule.getStatus(name)
    }

    /**
     * Get the name of the currently playing sound
     * @returns {Promise<string|null>} - Name of currently playing sound or null if none
     */
    static getCurrentlyPlayingSound() {
        return AudioPlayerModule.getCurrentlyPlayingSound()
    }

    /**
     * Unload a specific sound to free up memory
     * @param {string} name - Identifier of the sound to unload
     * @returns {Promise<boolean>}
     */
    static unloadSound(name: string): Promise<boolean> {
        return AudioPlayerModule.unloadSound(name)
    }

    /**
     * Unload all sounds to free up memory
     * @returns {Promise<boolean>}
     */
    static unloadAllSounds(): Promise<boolean> {
        return AudioPlayerModule.unloadAllSounds()
    }

    /**
     * Deactivate the audio session when done with audio playback
     * @returns {Promise<boolean>}
     */
    static deactivateAudioSession(): Promise<boolean> {
        return AudioPlayerModule.deactivateAudioSession()
    }

    /**
     * Clean up all resources and reset the module
     * @returns {Promise<boolean>}
     */
    static cleanup(): Promise<boolean> {
        return AudioPlayerModule.cleanup()
    }
}

export default AudioPlayer
