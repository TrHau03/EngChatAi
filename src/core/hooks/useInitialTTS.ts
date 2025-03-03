import Tts from "react-native-tts"

export const useInitialTTS = () => {
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
        Tts.setDefaultRate(1, true)
        Tts.setDefaultPitch(0.7)
    }
    return {
        initialTts,
    }
}
