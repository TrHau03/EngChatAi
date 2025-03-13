export interface Message {
    _id: string
    role: "user" | "model"
    content: string
    content_translated?: string
    createdAt?: Date
}
