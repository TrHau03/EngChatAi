import { useAppSelector } from "@/core/hooks"

export const useChat = () => {
    const chat = useAppSelector((state) => state.root.chat.chat)

    return {
        data: chat,
    }
}
