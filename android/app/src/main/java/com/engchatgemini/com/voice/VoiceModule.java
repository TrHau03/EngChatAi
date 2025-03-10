package com.engchatgemini.com.voice;

import android.media.MediaRecorder;
import android.os.Build;
import android.os.Environment;
import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.*;

import java.io.File;
import java.io.IOException;

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
    public void startRecording(Promise promise) {
        try {
            filePath = getReactApplicationContext().getExternalFilesDir(Environment.DIRECTORY_MUSIC).getAbsolutePath() + "/recording.mp3";
            recorder = new MediaRecorder();
            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            recorder.setOutputFile(filePath);
            recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
            recorder.prepare();
            recorder.start();
            promise.resolve(filePath);
        } catch (IOException e) {
            promise.reject("RECORDING_ERROR", "Lỗi khi ghi âm: " + e.getMessage());
        }
    }
    
    @ReactMethod
    public void stopRecording(Promise promise) {
        try {
            recorder.stop();
            recorder.release();
            recorder = null;
            promise.resolve(filePath);
        } catch (Exception e) {
            promise.reject("STOP_ERROR", "Lỗi khi dừng ghi âm: " + e.getMessage());
        }
    }
}
