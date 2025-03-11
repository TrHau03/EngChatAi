import { Message } from "@/core/entities/message"
import { Realm } from "@realm/react"
import { List } from "realm"
export class Chat extends Realm.Object {
    _id!: Realm.BSON.ObjectId
    messages!: List<Message>
    createdAt?: Date
    static generate(messages: List<Message>) {
        return {
            _id: new Realm.BSON.ObjectId(),
            messages,
            createdAt: new Date(),
        }
    }

    static schema = {
        name: "Chat",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            messages: "mixed[]",
            createdAt: "date",
        },
    }
}
