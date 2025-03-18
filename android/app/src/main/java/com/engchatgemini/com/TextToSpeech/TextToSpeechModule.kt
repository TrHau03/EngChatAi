package com.engchatgemini.com.TextToSpeech

import android.speech.tts.TextToSpeech
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.*

class TextToSpeechModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), TextToSpeech.OnInitListener {

    private var tts: TextToSpeech? = null
    private var isSpeaking = false
    private var language: String = "en-US"
    private var rate: Float = 1.0f
    private var pitch: Float = 1.0f

    init {
        tts = TextToSpeech(reactContext, this)
    }

    override fun getName(): String {
        return "TextToSpeechModule"
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            tts?.language = Locale(language)
        }
    }

    @ReactMethod
    fun setDefaultLanguage(language: String) {
        this.language = language
        tts?.language = Locale(language)
    }

    @ReactMethod
    fun setDefaultRate(rate: Double) {
        this.rate = rate.toFloat()
        tts?.setSpeechRate(this.rate)
    }

    @ReactMethod
    fun setDefaultPitch(pitch: Double) {
        this.pitch = pitch.toFloat()
        tts?.setPitch(this.pitch)
    }

    @ReactMethod
    fun speak(text: String, promise: Promise) {
        if (isSpeaking) {
            promise.reject("SPEAKING_ERROR", "Already speaking")
            return
        }
        isSpeaking = true
        val result = tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "TTS_UTTERANCE_ID")
        if (result == TextToSpeech.SUCCESS) {
            sendEvent("onSpeechStart", null)
            promise.resolve(true)
        } else {
            promise.reject("TTS_ERROR", "Failed to start speech")
        }
    }

    @ReactMethod
    fun stop(promise: Promise) {
        if (!isSpeaking) {
            promise.reject("STOPPING_ERROR", "Not speaking")
            return
        }
        tts?.stop()
        isSpeaking = false
        sendEvent("onSpeechEnd", null)
        promise.resolve(true)
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    override fun onCatalystInstanceDestroy() {
        tts?.stop()
        tts?.shutdown()
    }
}
