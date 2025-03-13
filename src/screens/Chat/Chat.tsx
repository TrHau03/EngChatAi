import { AppIcon, Wrapper } from "@/core/components"
import { Message } from "@/core/entities/message"
import { fontSize, padding, spacing } from "@/core/theme"
import { logger } from "@/core/utils"
import { ChatProps, RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed"
import React, { useCallback } from "react"
import { FlatList, Pressable } from "react-native"
import { useChat } from "./hooks/useChat"

interface ItemType {
    _id: string
    messages: Message[]
}

const Chat = () => {
    const navigation = useNavigation<ChatProps>()
    const styles = useStyles(0)
    const { data } = useChat()
    logger.object({ data })
    const {
        theme: { colors },
    } = useTheme()

    const handleNavigate = useCallback((type: "new" | "view", data?: any) => {
        navigation.navigate(RootStackParamEnum.NewChat, { type: type, messages: data })
    }, [])

    const renderItem = useCallback(({ item }: { item: ItemType }) => {
        return (
            <Pressable style={styles.containerItem} onPress={() => handleNavigate("view", item.messages ?? [])}>
                <Text style={styles.textItem}>{item.messages[0]?.content?.toString() ?? ""}</Text>
                <Divider />
            </Pressable>
        )
    }, [])

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <AppIcon
                name="add"
                type="ionicon"
                isPaddingIcon
                size={32}
                containerStyles={styles.addIcon}
                color={colors.primary}
                onPress={() => handleNavigate("new")}
            />
            <FlatList
                data={data.reverse() ?? []}
                keyExtractor={(item: ItemType, index) => index.toString()}
                renderItem={renderItem}
            />
        </Wrapper>
    )
}

export default Chat

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: padding.base,
        },
        addIcon: { alignSelf: "flex-end" },
        textItem: {
            fontSize: fontSize.xl,
        },
        containerItem: {
            paddingHorizontal: padding.base,
            paddingVertical: padding.small,
            gap: spacing.base,
        },
    }
})
