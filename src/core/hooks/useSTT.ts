import { NativeModules } from "react-native"
import { logger } from "../utils"

export const useSTT = () => {
    const { VoiceModule } = NativeModules
    const startSTT = async () => {
        try {
            const message = await VoiceModule.startRecording()
            logger.info("message", message)
        } catch (error) {}
    }
    return {
        startSTT,
    }
}
