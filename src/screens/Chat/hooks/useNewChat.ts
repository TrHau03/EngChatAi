import { Message } from "@/core/entities/message"
import { useModel } from "@/core/hooks"
import { generateID, logger, Role } from "@/core/utils"
import { useState } from "react"

export const useNewChat = () => {
    const [data, setData] = useState<Message[]>([
        {
            id: "1",
            role: "model",
            content: "Hehello",
        },
        {
            id: "2",
            role: "user",
            content: "Hello How are you to day?",
        },
        {
            id: "3",
            role: "model",
            content: "Hehello",
        },
    ])
    const model = useModel()

    const onSubmit = async (value: any) => {
        setData((prev) => [
            ...prev,
            {
                id: generateID(),
                role: Role.USER,
                content: value.toString(),
            },
        ])
        try {
            const { response, response_translated } = await model.fetchApiModel(value.toString())
            logger.object({ response, response_translated })
            setData((prev) => [
                ...prev,
                {
                    id: generateID(),
                    role: Role.AI,
                    content: response,
                },
            ])
        } catch (error: any) {
            logger.error("fetchAPIGemini", error)
        }
    }
    return {
        data,
        onSubmit,
    }
}
