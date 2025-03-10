import { appActions } from "@/redux/reducers/App/appSlice"
import { useEffect } from "react"
import { NativeEventEmitter, NativeModules } from "react-native"
import { logger } from "../utils"
import { useAppDispatch } from "./useRedux"
const { TextToSpeechModule } = NativeModules
const ttsEvent = new NativeEventEmitter(TextToSpeechModule)

export const useInitialTTS = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const startSubscription = ttsEvent.addListener("onSpeechStart", (event) => {
            logger.object({ event })
        })

        const endSubscription = ttsEvent.addListener("onSpeechEnd", (event) => {
            logger.object({ event })
            TextToSpeechModule.stop()
            dispatch(appActions.updateState({ tts: { id: "", isSpeaking: false } }))
        })
        TextToSpeechModule.setDefaultLanguage("en-US")
        TextToSpeechModule.setDefaultRate(0.5)
        TextToSpeechModule.setDefaultPitch(1.0)
        return () => {
            startSubscription.remove()
            endSubscription.remove()
        }
    }, [])
    return {}
}
