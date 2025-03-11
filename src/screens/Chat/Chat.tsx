import { AppIcon, Wrapper } from "@/core/components"
import { Message } from "@/core/entities/message"
import { fontSize, padding, spacing } from "@/core/theme"
import { logger } from "@/core/utils"
import { ChatProps, RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed"
import React, { useCallback } from "react"
import { FlatList, View } from "react-native"
import { useChat } from "./hooks/useChat"

interface ItemType {
    _id: Realm.BSON.ObjectId
    messages: Message[]
}

const Chat = () => {
    const navigation = useNavigation<ChatProps>()
    const styles = useStyles(0)
    const { data } = useChat()
    const {
        theme: { colors },
    } = useTheme()

    const handleNavigate = useCallback(() => {
        navigation.navigate(RootStackParamEnum.NewChat)
    }, [])

    const renderItem = useCallback(({ item }: { item: ItemType }) => {
        logger.object({ item })
        return (
            <View style={styles.containerItem}>
                <Text style={styles.textItem}>{item._id.toHexString()}</Text>
                <Divider />
            </View>
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
                onPress={handleNavigate}
            />
            <FlatList
                data={data.sorted("createdAt") as unknown as ItemType[]}
                keyExtractor={(item: ItemType) => item._id.toHexString()}
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
