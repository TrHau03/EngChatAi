import { MessageItem, Wrapper } from "@/components"
import InputBar from "@/components/InputBar"
import { Message } from "@/entities/message"
import { useModel } from "@/hooks"
import { NewChatProps } from "@/navigation/stack/RootStack"
import { spacing } from "@/theme"
import { logger, Role } from "@/utils"
import { useNavigation } from "@react-navigation/native"
import { makeStyles } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { FlatList, KeyboardAvoidingView, Platform } from "react-native"

const NewChat = () => {
    const styles = useStyles()
    const navigation = useNavigation<NewChatProps>()
    const [data, setData] = useState<Message[]>([])
    const model = useModel(data)

    const behavior = Platform.OS === "ios" ? "padding" : "height"

    const renderItem = useCallback(({ item }: any) => {
        return <MessageItem role={item.role} content={item.content} />
    }, [])

    const onSubmit = async (value: any) => {
        setData((prev) => [
            ...prev,
            {
                role: Role.USER,
                content: value.toString(),
            },
        ])
        try {
            const { response, response_translated } = await model.fetchApiModel(value.toString())
            logger.object({ response, response_translated })
            setData((prev) => [
                ...prev,
                {
                    role: Role.AI,
                    content: response,
                },
            ])
        } catch (error: any) {
            logger.error("fetchAPIGemini", error)
        }
    }

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                {/* <View style={{ flex: 1 }}></View> */}
                <FlatList data={data} renderItem={renderItem} />
                <InputBar onSubmit={onSubmit} />
            </KeyboardAvoidingView>
        </Wrapper>
    )
}

export default NewChat

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: spacing.base,
        },
    }
})
