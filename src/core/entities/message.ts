import { Realm } from "@realm/react"

export interface Message {
    _id: Realm.BSON.ObjectId
    role: "user" | "model"
    content: string
    content_translated?: string
    createdAt?: Date
}
