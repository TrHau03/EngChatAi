package com.engchatgemini.com.voice

import android.media.MediaPlayer
import android.util.Log
import com.facebook.react.bridge.*
import java.io.IOException

class VoiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var mediaPlayer: MediaPlayer? = null
    private var currentUrl: String? = null

    override fun getName(): String {
        return "VoiceModule"
    }

    @ReactMethod
    fun playAudio(url: String, promise: Promise) {
        try {
            if (mediaPlayer == null) {
                mediaPlayer = MediaPlayer()
                mediaPlayer?.setOnCompletionListener {
                    Log.d("VoiceModule", "Playback completed")
                }
            } else {
                mediaPlayer?.reset()
            }

            mediaPlayer?.setDataSource(url)
            mediaPlayer?.prepareAsync()
            mediaPlayer?.setOnPreparedListener {
                it.start()
                currentUrl = url
                promise.resolve("Playing")
            }
        } catch (e: IOException) {
            promise.reject("PLAY_ERROR", "Lỗi khi phát âm thanh: ${e.message}")
        }
    }

    @ReactMethod
    fun pauseAudio(promise: Promise) {
        mediaPlayer?.let {
            if (it.isPlaying) {
                it.pause()
                promise.resolve("Paused")
            } else {
                it.start()
                promise.resolve("Resumed")
            }
        } ?: promise.reject("NO_PLAYER", "MediaPlayer chưa được khởi tạo")
    }

    @ReactMethod
    fun stopAudio(promise: Promise) {
        mediaPlayer?.let {
            it.stop()
            it.reset()
            promise.resolve("Stopped")
        } ?: promise.reject("NO_PLAYER", "MediaPlayer chưa được khởi tạo")
    }

    @ReactMethod
    fun seekForward(promise: Promise) {
        mediaPlayer?.let {
            val newPosition = it.currentPosition + 10_000
            it.seekTo(newPosition.coerceAtMost(it.duration))
            promise.resolve("Seeked Forward")
        } ?: promise.reject("NO_PLAYER", "MediaPlayer chưa được khởi tạo")
    }

    @ReactMethod
    fun seekBackward(promise: Promise) {
        mediaPlayer?.let {
            val newPosition = it.currentPosition - 10_000
            it.seekTo(newPosition.coerceAtLeast(0))
            promise.resolve("Seeked Backward")
        } ?: promise.reject("NO_PLAYER", "MediaPlayer chưa được khởi tạo")
    }
}
