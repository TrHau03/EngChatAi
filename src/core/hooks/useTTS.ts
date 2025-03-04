import { appActions } from "@/redux/reducers/App/appSlice"
import Tts from "react-native-tts"
import { logger } from "../utils"
import { useAppDispatch } from "./useRedux"
export const useTTS = () => {
    const dispatch = useAppDispatch()
    const speak = (id: string = "", text: string) => {
        logger.object({ id, text })
        if (!text || !id) return
        Tts.stop()
        Tts.speak(text)
        dispatch(appActions.updateState({ tts: { id, isSpeaking: true } }))
    }
    const stop = () => {
        Tts.stop()
        dispatch(appActions.updateState({ tts: { id: "", isSpeaking: false } }))
    }
    return {
        speak,
        stop,
    }
}
