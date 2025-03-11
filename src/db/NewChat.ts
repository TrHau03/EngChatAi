import { Message } from "@/core/entities/message"
import { Realm } from "@realm/react"
export class NewChat extends Realm.Object {
    _id!: Realm.BSON.ObjectId
    role!: string
    content!: string
    content_translated!: string
    createdAt!: Date

    static generate({ role, content, content_translated }: Partial<Message>) {
        return {
            _id: new Realm.BSON.ObjectId(),
            role,
            content,
            content_translated,
            createdAt: new Date(),
        }
    }

    static schema = {
        name: "NewChat",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            role: "string",
            content: "string",
            content_translated: "string",
            createdAt: "date",
        },
    }
}
