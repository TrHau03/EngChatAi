import { useAppSelector } from "@/core/hooks"
import { useCallback, useState } from "react"

export const useChat = () => {
    const chat = useAppSelector((state) => state.root.chat.chat)
    const [isVisible, setIsVisible] = useState(false)

    const handleToggle = useCallback(() => {
        setIsVisible((prev) => !prev)
    }, [])

    const handleDelete = useCallback((id: string) => {
        setIsVisible(false)
    }, [])

    return {
        data: chat,
        isVisible,
        handleToggle,
        handleDelete,
    }
}
