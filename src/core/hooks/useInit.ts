import { appActions } from "@/redux/reducers/App/appSlice"
import Tts from "react-native-tts"
import { useAppDispatch, useAppSelector } from "./useRedux"
import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import { logger } from "../utils"

export const useInit = () => {
    const dispatch = useAppDispatch()
    const language = useAppSelector((state) => state.root.app.language)
    logger.info("language" , language)
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
        Tts.setDefaultLanguage("en_US")
        Tts.setDefaultRate(1, true)
        Tts.setDefaultPitch(0.7)
        Tts.addEventListener("tts-progress", (event) => { })
        Tts.addEventListener("tts-finish", (event) => {
            dispatch(appActions.updateState({ tts: { id: "", isSpeaking: false } }))
        })
        Tts.addEventListener("tts-cancel", (event) => {
            dispatch(appActions.updateState({ tts: { id: "", isSpeaking: false } }))
        })
    }
    const initI18Next = () => {
        i18n.createInstance()
            .use(initReactI18next)
            .init({
                lng: language,
                resources: {
                    en: {
                        translation: require("@/assets/languages/en.json"),
                    },
                    vi: {
                        translation: require("@/assets/languages/vi.json"),
                    },
                },
                fallbackLng: "en",
                compatibilityJSON: "v4",
                interpolation: {
                    escapeValue: false,
                },
            })
    }
    return {
        language,
        initialTts,
        initI18Next
    }
}
