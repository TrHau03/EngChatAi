import { useEffect, useState } from "react"
import { NativeEventEmitter, NativeModules } from "react-native"
const { SpeechToTextModule } = NativeModules
const SpeechToTextEvent = new NativeEventEmitter(SpeechToTextModule)

export const useSTT = () => {
    const [isRecording, setIsRecording] = useState(false)

    useEffect(() => {
        const startSubscription = SpeechToTextEvent.addListener("onSpeechStart", (event) => {
            console.log("onSpeechStart", event)
        })
        const endSubscription = SpeechToTextEvent.addListener("onSpeechEnd", (event) => {
            console.log("onSpeechEnd", event)
            setIsRecording(false)
        })
        const resultSubscription = SpeechToTextEvent.addListener("onSpeechResults", (event) => {
            console.log("onSpeechResult", event)
            SpeechToTextModule.stopListening()
        })
        return () => {
            startSubscription.remove()
            endSubscription.remove()
            resultSubscription.remove()
        }
    }, [])

    const startSTT = async () => {
        setIsRecording(true)
        try {
            await SpeechToTextModule.startListening()
        } catch (error) {}
    }
    const stopSTT = async () => {
        setIsRecording(false)
        try {
            await SpeechToTextModule.stopListening()
        } catch (error) {}
    }
    return {
        startSTT,
        stopSTT,
        isRecording,
    }
}
