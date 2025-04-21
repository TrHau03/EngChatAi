import { envApp, logger } from "@/core/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(envApp.GEMINI_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are a teacher English. Your name is Jessica. you can teach English all level`,
    generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.5,
        responseMimeType: "application/json",
    },
})
const chat = model.startChat({
    history: [],
})

export const useModel = () => {
    const parseTextToJSON = (text: string) => {
        const newText = text.replace(/^.*?\{/, "{").replace(/\}.*$/, "}")
        try {
            const text = JSON.parse(newText)
            return {
                ...text,
            }
        } catch (error: any) {
            logger.error("parseError", error)
            return newText
        }
    }

    const fetchApiModel = async (prompt: string) => {
        let result = await chat.sendMessage(prompt)
        logger.info("result", result.response.text())
        return parseTextToJSON(result.response.text())
    }

    return {
        parseTextToJSON,
        fetchApiModel,
    }
}
