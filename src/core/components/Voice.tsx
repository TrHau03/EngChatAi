import React, { useState } from "react"
import { View, Text, TouchableOpacity, PermissionsAndroid, Alert } from "react-native"
import { NativeModules } from "react-native"
import Sound from "react-native-sound"

const { VoiceModule } = NativeModules

const VoiceRecorder = () => {
    const [isRecording, setIsRecording] = useState(false)
    const [audioFile, setAudioFile] = useState<string | null>(null)
    const [sound, setSound] = useState<Sound | null>(null)

    // Yêu cầu quyền ghi âm
    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
                title: "Cho phép ứng dụng sử dụng Micro",
                message: "Ứng dụng cần quyền truy cập vào micro để ghi âm",
                buttonPositive: "Đồng ý",
            })
            return granted === PermissionsAndroid.RESULTS.GRANTED
        } catch (err) {
            console.warn("Lỗi cấp quyền:", err)
            return false
        }
    }

    // Bắt đầu ghi âm
    const startRecording = async () => {
        const hasPermission = await requestPermission()
        if (!hasPermission) {
            Alert.alert("Quyền bị từ chối", "Bạn cần cấp quyền ghi âm để sử dụng tính năng này.")
            return
        }

        try {
            const filePath = await VoiceModule.startRecording()
            setIsRecording(true)
            console.log("Bắt đầu ghi âm tại:", filePath)
        } catch (error) {
            console.error("Lỗi khi bắt đầu ghi âm:", error)
        }
    }

    // Dừng ghi âm
    const stopRecording = async () => {
        try {
            const filePath = await VoiceModule.stopRecording()
            setAudioFile(filePath)
            setIsRecording(false)
            console.log("File ghi âm đã lưu:", filePath)
        } catch (error) {
            console.error("Lỗi khi dừng ghi âm:", error)
        }
    }

    // Phát lại file ghi âm
    const playRecording = () => {
        if (!audioFile) return

        const soundInstance = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.error("Lỗi khi tải file âm thanh:", error)
                return
            }
            soundInstance.play((success) => {
                if (!success) {
                    console.error("Lỗi khi phát âm thanh")
                }
                soundInstance.release() // Giải phóng bộ nhớ sau khi phát xong
            })
        })
        setSound(soundInstance)
    }

    return (
        <View style={{ padding: 20, alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}
                style={{
                    backgroundColor: isRecording ? "red" : "green",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>{isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}</Text>
            </TouchableOpacity>

            {audioFile && (
                <TouchableOpacity
                    onPress={playRecording}
                    style={{
                        backgroundColor: isRecording ? "red" : "green",
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 20,
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Ghi âm</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VoiceRecorder
