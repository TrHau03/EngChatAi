import { useState } from "react"
import Tts from "react-native-tts"
export const useTTS = () => {
    const [isSpeaking, setIsSpeaking] = useState(false)
    Tts.addEventListener("tts-start", (event) => {
        setIsSpeaking(true)
    })
    Tts.addEventListener("tts-progress", (event) => {})
    Tts.addEventListener("tts-finish", (event) => {
        setIsSpeaking(false)
    })
    Tts.addEventListener("tts-cancel", (event) => {
        setIsSpeaking(false)
    })
    const speak = (text: string) => {
        Tts.stop()
        Tts.speak(text)
    }
    const stop = () => {
        Tts.stop()
        setIsSpeaking(false)
    }
    return {
        isSpeaking,
        speak,
        stop,
    }
}
