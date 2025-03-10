import { useEffect, useState } from "react"
import { NativeModules } from "react-native"
import { logger } from "../utils"
const { SpeechToTextModule } = NativeModules

export const useSTT = () => {
    const [isRecording, setIsRecording] = useState(false)
    useEffect(() => {
        const requestPermission = async () => {
            SpeechToTextModule.requestPermission((error: any, result: any) => {
                if (error) {
                    logger.error("Request permission", error)
                } else {
                    logger.info("Permission granted:", result)
                }
            })
        }
        requestPermission()
    }, [])

    const startSTT = async () => {
        setIsRecording(true)
        try {
            SpeechToTextModule.startListening((error: any, result: any) => {
                if (error) {
                    logger.error("Start listening", error)
                } else {
                    logger.info("Start listening", result)
                    setIsRecording(false)
                }
            })
        } catch (error) {}
    }
    const stopSTT = async () => {
        setIsRecording(false)
        SpeechToTextModule.stopListening((error: any, result: any) => {
            if (error) {
                logger.error("Stop listening", error)
            } else {
                logger.info("Stop listening", result)
            }
        })
    }
    return {
        startSTT,
        stopSTT,
        isRecording,
    }
}
