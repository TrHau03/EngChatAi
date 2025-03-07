import { envApp, logger } from "@/core/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(envApp.GEMINI_KEY)
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are a teacher English. Your name is Jessica. you can teach English all level. All your response for me following { "response": "your response", "response_translated": "your response by Vietnamese"  }`,
    generationConfig: {
        maxOutputTokens: 100,
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
        logger.info("newText", newText)
        try {
            const text = JSON.parse(newText)
            return {
                response: text.response,
                response_translated: text.response_translated,
            }
        } catch (error: any) {
            logger.error("parseError", error)
            return {
                response: newText,
                response_translated: "",
            }
        }
    }

    const formatPrompt = (prompt: string) => {
        return `${prompt}. Your response for me following { "response": "your response", "response_translated": "your response by Vietnamese"  }`
    }

    const fetchApiModel = async (prompt: string) => {
        let result = await chat.sendMessage(formatPrompt(prompt))
        logger.info("result", result.response.text())
        return parseTextToJSON(result.response.text())
    }

    return {
        parseTextToJSON,
        fetchApiModel,
    }
}
