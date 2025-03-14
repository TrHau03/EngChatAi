import { Message } from "@/core/entities/message"
import { useModel } from "@/core/hooks"
import { generateID, logger, Role } from "@/core/utils"
import { useEffect, useState } from "react"

export const useNewChat = () => {
    const model = useModel()
    const [data, setData] = useState<Message[]>([])

    useEffect(() => {
        const prompt = "My name is Hau. I need to learn English. Can you say hello and ask me a question?"
        const handleFirstPrompt = async () => {
            try {
                const { response, response_translated } = await model.fetchApiModel(prompt)
                logger.object({ response, response_translated })
                const data = {
                    _id: generateID(),
                    role: Role.AI,
                    content: response,
                    content_translated: response_translated,
                }
                setData((prev) => [...prev, data])
            } catch (error: any) {
                logger.error("fetchAPIGemini", error)
            }
        }
        handleFirstPrompt()
    }, [])

    const onSubmit = async (value: any) => {
        setData((prev) => {
            const data = {
                _id: generateID(),
                role: Role.USER,
                content: value.toString(),
                content_translated: "", // Input from user is not translated
            }
            return [...prev, data]
        })
        try {
            const { response, response_translated } = await model.fetchApiModel(value.toString())
            logger.object({ response, response_translated })
            const data = {
                _id: generateID(),
                role: Role.AI,
                content: response,
                content_translated: response_translated,
            }
            setData((prev) => [...prev, data])
        } catch (error: any) {
            logger.error("fetchAPIGemini", error)
        }
    }
    return {
        data,
        setData,
        onSubmit,
    }
}
