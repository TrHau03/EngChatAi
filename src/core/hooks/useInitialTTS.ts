import { appActions } from "@/redux/reducers/App/appSlice"
import Tts from "react-native-tts"
import { useAppDispatch } from "./useRedux"

export const useInitialTTS = () => {
    const dispatch = useAppDispatch()
    const initialTts = async () => {
        Tts.getInitStatus().then(
            (e) => {
                console.log("ALL OK TTS ✅")
            },
            (err) => {
                if (err.code === "no_engine") {
                    console.log("NO ENGINE TTS ✅")
                    Tts.requestInstallEngine()
                }
            },
        )
        Tts.setIgnoreSilentSwitch("ignore")
        Tts.setDefaultLanguage("en-US")
        Tts.setDefaultRate(1, true)
        Tts.setDefaultPitch(0.7)
        Tts.addEventListener("tts-progress", (event) => {})
        Tts.addEventListener("tts-finish", (event) => {
            dispatch(appActions.updateState({ tts: { id: "", isSpeaking: false } }))
        })
        Tts.addEventListener("tts-cancel", (event) => {
            dispatch(appActions.updateState({ tts: { id: "", isSpeaking: false } }))
        })
    }
    return {
        initialTts,
    }
}
