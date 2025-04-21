import { Message } from "@/core/entities/message"

export interface GetChatResponse {
    email: string
    data: {
        _id: string
        title: string
        messages: Message[]
    }[]
}

export interface UpdateChatRequest {
    _id: string
    title: string
    messages: Message[]
}
