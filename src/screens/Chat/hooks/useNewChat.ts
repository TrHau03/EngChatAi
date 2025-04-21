import { Message } from "@/core/entities/message"
import { useAppDispatch, useModel } from "@/core/hooks"
import { generateID, logger, Role } from "@/core/utils"
import { appActions } from "@/redux/reducers/App/appSlice"
import { useUpdateChatMutation } from "@/redux/reducers/Chat/chatService"
import { chatActions } from "@/redux/reducers/Chat/chatSlice"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"

export const useNewChat = (type: "new" | "view") => {
    const formatPrompt = (prompt: string) => {
        return `${prompt}.Short answer and your response following { "response": "your response", "response_translated": "your response by Vietnamese"  }`
    }
    const model = useModel()
    const [data, setData] = useState<Message[]>([])
    const [isNext, setIsNext] = useState(false)
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [updateChatMutation] = useUpdateChatMutation()
    useEffect(() => {
        const prompt =
            "My name is Hau. You are a chat bot and you know everything in the world. Can you say hello and ask me a question?"
        const handleFirstPrompt = async () => {
            try {
                const { response, response_translated } = await model.fetchApiModel(formatPrompt(prompt))
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
        type === "new" && handleFirstPrompt()
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
            const { response, response_translated } = await model.fetchApiModel(formatPrompt(value.toString()))
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
    const handleSave = async () => {
        const newData = { _id: generateID(), title: data[0].content, messages: data }
        dispatch(appActions.updateState({ isLoading: true }))
        try {
            const status = await updateChatMutation(newData)
            if (status) {
                setIsNext(true)
                dispatch(chatActions.updateChat(newData))
                setTimeout(() => {
                    navigation.goBack()
                }, 1000)
            }
        } catch (error) {
        } finally {
            dispatch(appActions.updateState({ isLoading: false }))
        }
    }
    return {
        isNext,
        data,
        setData,
        onSubmit,
        handleSave,
        dispatch,
    }
}
