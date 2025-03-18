import { useAppDispatch, useAppSelector } from "@/core/hooks"
import { chatActions } from "@/redux/reducers/Chat/chatSlice"
import { useCallback, useState } from "react"

export const useChat = () => {
    const dispatch = useAppDispatch()
    const chat = useAppSelector((state) => state.root.chat.chat)
    const [isVisible, setIsVisible] = useState(false)

    const handleToggle = useCallback(() => {
        setIsVisible((prev) => !prev)
    }, [])

    const handleDelete = useCallback(
        (_id: string) => {
            const data = chat.filter((item) => item._id !== _id)
            dispatch(chatActions.deleteChat(data))
            setIsVisible(false)
        },
        [chat, dispatch],
    )

    return {
        data: chat,
        isVisible,
        handleToggle,
        handleDelete,
    }
}
