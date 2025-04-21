import { useAppDispatch, useAppSelector } from "@/core/hooks"
import { logger } from "@/core/utils"
import { appActions } from "@/redux/reducers/App/appSlice"
import { useDeleteChatMutation, useGetChatQuery } from "@/redux/reducers/Chat/chatService"
import { chatActions } from "@/redux/reducers/Chat/chatSlice"
import { useCallback, useEffect, useState } from "react"

export const useChat = () => {
    const dispatch = useAppDispatch()
    const chat = useAppSelector((state) => state.root.chat.chat)
    const { isError, isFetching, data, error, refetch, isLoading } = useGetChatQuery()
    const [deleteChatMutation] = useDeleteChatMutation()
    logger.object(error)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (data) {
            dispatch(chatActions.updateState({ chat: data.data }))
        }
    }, [data, dispatch])

    const handleToggle = useCallback(() => {
        setIsVisible((prev) => !prev)
    }, [])

    const handleDelete = useCallback(
        async (_id: string) => {
            dispatch(appActions.updateState({ isLoading: true }))
            try {
                const status = await deleteChatMutation(_id)
                if (status) {
                    const data = chat.filter((item) => item._id !== _id)
                    dispatch(chatActions.deleteChat(data))
                    setIsVisible(false)
                }
            } catch (error: any) {
                logger.error("deleteChat", error)
            } finally {
                dispatch(appActions.updateState({ isLoading: false }))
            }
        },
        [chat, dispatch],
    )

    return {
        isError,
        isFetching,
        isLoading,
        data: chat,
        isVisible,
        refetch,
        handleToggle,
        handleDelete,
    }
}
