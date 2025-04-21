import React, { useState } from "react"
import { View, Button, StyleSheet } from "react-native"
import { NativeModules } from "react-native"

import * as RNFS from "@dr.pogodin/react-native-fs"

const { VoiceModule } = NativeModules

interface NativeAudioPlayerProps {
    url: string
}

const NativeAudioPlayer: React.FC<NativeAudioPlayerProps> = ({ url }) => {
    const [localPath, setLocalPath] = useState<string | null>(null)

    const getCachedPath = async () => {
        const filename = url.split("/").pop() || "audio.mp3"
        const path = `${RNFS.CachesDirectoryPath}/${filename}`
        const exists = await RNFS.exists(path)
        if (!exists) {
            console.log("⏬ Downloading audio to cache...")
            await RNFS.downloadFile({
                fromUrl: url,
                toFile: path,
            }).promise
            console.log("✅ Download complete.")
        } else {
            console.log("📦 Audio already cached.")
        }

        return path
    }

    const handlePlay = async () => {
        try {
            const path = await getCachedPath()
            setLocalPath(path)

            VoiceModule.playAudio(`file://${path}`)
                .then(() => console.log("🎧 Playing audio..."))
                .catch((err: any) => console.error("Play error:", err))
        } catch (error) {
            console.error("Cache/Play error:", error)
        }
    }

    const handlePause = () => {
        VoiceModule.pauseAudio()
            .then(() => console.log("Toggled pause/resume"))
            .catch((err: any) => console.error("Pause error:", err))
    }

    const handleStop = () => {
        VoiceModule.stopAudio()
            .then(() => console.log("Stopped audio"))
            .catch((err: any) => console.error("Stop error:", err))
    }

    const handleSeekForward = () => {
        VoiceModule.seekForward()
            .then(() => console.log("Seeked forward"))
            .catch((err: any) => console.error("Seek forward error:", err))
    }

    const handleSeekBackward = () => {
        VoiceModule.seekBackward()
            .then(() => console.log("Seeked backward"))
            .catch((err: any) => console.error("Seek backward error:", err))
    }

    return (
        <View style={styles.container}>
            <Button title="▶️ Play" onPress={handlePlay} />
            <Button title="⏸ Pause/Resume" onPress={handlePause} />
            <Button title="⏹ Stop" onPress={handleStop} />
            <Button title="⏩ +10s" onPress={handleSeekForward} />
            <Button title="⏪ -10s" onPress={handleSeekBackward} />
        </View>
    )
}

export default NativeAudioPlayer

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
})
