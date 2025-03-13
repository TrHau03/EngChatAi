import { logger } from "@/core/utils"
import AsyncStorage from "@react-native-async-storage/async-storage"

export class Chat {
    static update = async (data: any) => {
        try {
            if (!!data) {
                await AsyncStorage.setItem("chat", JSON.stringify(data))
            }
        } catch (error: any) {
            logger.error("updateChat", error)
        }
    }
    static get = async () => {
        try {
            const data = await AsyncStorage.getItem("chat")
            if (!!data) {
                return JSON.parse(data)
            }
            return []
        } catch (error: any) {
            logger.error("getChat", error)
        }
    }
    static delete = async (id: string) => {
        try {
            const data = await AsyncStorage.getItem("chat")
            if (!!data) {
                const newData = JSON.parse(data)
                const index = newData.findIndex((item: any) => item.id === id)
                if (index !== -1) {
                    newData.splice(index, 1)
                    await AsyncStorage.setItem("chat", JSON.stringify(newData))
                }
            }
        } catch (error: any) {
            logger.error("getChat", error)
        }
    }
}
