import { Chat } from "@/db/Chat"
import { useQuery } from "@realm/react"

export const useChat = () => {
    const chat = useQuery(Chat)
    return {
        data: chat,
    }
}
