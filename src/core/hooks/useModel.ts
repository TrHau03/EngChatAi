import { envApp, logger } from "@/core/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(envApp.GEMINI_KEY)
const model = genAI.getGenerativeModel({
    model: envApp.GEMINI_MODEL,
    systemInstruction: `You are a teacher English. Your name is Jessica. you can teach English all level. All your response for me following { "response": "your response", "response_translated": "your response by Vietnamese"  }`,
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

    const fetchApiModel = async (prompt: string) => {
        let result = await chat.sendMessage(prompt)
        return parseTextToJSON(result.response.text())
    }

    return {
        parseTextToJSON,
        fetchApiModel,
    }
}
