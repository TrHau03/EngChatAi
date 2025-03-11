import { useModel } from "@/core/hooks"
import { logger, Role } from "@/core/utils"
import { NewChat } from "@/db/NewChat"
import { useQuery, useRealm } from "@realm/react"

export const useNewChat = () => {
    const realm = useRealm()
    const newChat = useQuery(NewChat)
    const model = useModel()

    const onSubmit = async (value: any) => {
        realm.write(() => {
            const data = {
                role: Role.USER,
                content: value.toString(),
                content_translated: "", // Input from user is not translated
            }
            realm.create("NewChat", NewChat.generate(data))
        })
        try {
            const { response, response_translated } = await model.fetchApiModel(value.toString())
            logger.object({ response, response_translated })
            realm.write(() => {
                const data = {
                    role: Role.AI,
                    content: response,
                    content_translated: response_translated,
                }
                realm.create("NewChat", NewChat.generate(data))
            })
        } catch (error: any) {
            logger.error("fetchAPIGemini", error)
        }
    }
    return {
        realm,
        data: newChat,
        onSubmit,
    }
}
