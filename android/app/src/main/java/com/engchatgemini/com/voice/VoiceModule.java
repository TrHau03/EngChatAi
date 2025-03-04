package com.engchatgemini.com.voice;

import android.media.MediaRecorder;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Objects;

public class VoiceModule extends ReactContextBaseJavaModule {
    private static final String TAG = "VoiceModule";
    private String filePath;
    private MediaRecorder recorder;

    public VoiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "VoiceModule";
    }

    @ReactMethod
    public  void startRecording (Promise promise){
        try{
            filePath = Objects.requireNonNull(getReactApplicationContext().getExternalFilesDir(null)).getAbsolutePath() + "/recording.mp3";
            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            recorder.setOutputFile(filePath);
            recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
            recorder.prepare();
            recorder.start();
            promise.resolve("Recording started at: " + filePath);
        } catch (Exception e) {
            promise.reject("Error", "Failed to start record", e);
        }
    }

    @ReactMethod
    public void stopRecording(Promise promise) {
        if (recorder != null) {
            recorder.stop();
            recorder.release();
            recorder = null;
            promise.resolve("Recording saved at: " + filePath);
        } else {
            promise.reject("ERROR", "Recorder is not started");
        }
    }
}