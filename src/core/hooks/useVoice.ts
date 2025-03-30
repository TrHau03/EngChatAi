import { useState } from "react"
import { NativeModules } from "react-native"
import { logger } from "../utils"
const { VoiceModule } = NativeModules

export const useSTT = () => {
    const [isRecording, setIsRecording] = useState(false)

    const startSTT = async () => {
        setIsRecording(true)
        VoiceModule.startRecording()
        try {
        } catch (error) {}
    }
    const stopSTT = async () => {
        setIsRecording(false)
        try {
            VoiceModule.stopRecording().then(({ messages, filePath }: any) => {
                logger.object({ messages, filePath })
                // SoundPlayer.playAsset(require(filePath))
            })
        } catch (error) {}
    }
    return {
        startSTT,
        stopSTT,
        isRecording,
    }
}
