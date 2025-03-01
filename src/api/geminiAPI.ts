import { envApp } from "@/utils/envConfigs"

const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(envApp.GEMINI_KEY)
const model = genAI.getGenerativeModel({ model: envApp.GEMINI_MODEL })

export const fetchApiModel = async (prompt: string) => {
    const result = await model.generateContent(prompt)
    console.log(result.response.text())
}
