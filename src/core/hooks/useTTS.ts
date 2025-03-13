import { appActions } from "@/redux/reducers/App/appSlice"
import { useEffect } from "react"
import { NativeModules } from "react-native"
import { logger } from "../utils"
import { useAppDispatch } from "./useRedux"
const { TextToSpeechModule } = NativeModules

export const useTTS = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {}, [])

    const speak = async (id: string = "", text: string) => {
        logger.object({ id, text })
        if (!text || !id) return
        dispatch(appActions.updateState({ tts: { id, isSpeaking: true } }))
        TextToSpeechModule.speak(text)
    }
    const stop = () => {
        try {
            TextToSpeechModule.stop()
        } catch (error) {}
        dispatch(appActions.updateState({ tts: { id: "", isSpeaking: false } }))
    }
    return {
        speak,
        stop,
    }
}
