import { useEffect } from "react"
import AudioPlayer from "../ module/Audio"
import { logger } from "../utils"

export const useAudio = () => {
    useEffect(() => {
        const initialAudio = async () => {
            await AudioPlayer.initialize()
        }
        const clearAudio = async () => {
            await AudioPlayer.cleanup()
        }
        initialAudio()
        return () => {
            clearAudio()
        }
    }, [])

    const playAudio = async (name: string, uri: string) => {
        logger.info("Audio", uri)
        const loadStatus = await AudioPlayer.loadSound(name, uri)
        logger.info("Audio", loadStatus)
        loadStatus && (await AudioPlayer.play(uri))
    }
    const stopAudio = async (name: string) => {
        await AudioPlayer.stop(name)
    }
    return {
        playAudio,
        stopAudio,
    }
}
