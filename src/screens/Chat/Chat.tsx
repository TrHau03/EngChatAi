import { AppActionSheet, AppIcon, Wrapper } from "@/core/components"
import { Message } from "@/core/entities/message"
import { fontSize, padding, spacing } from "@/core/theme"
import { ChatProps, RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Pressable, View } from "react-native"
import { useChat } from "./hooks/useChat"

interface ItemType {
    _id: string
    messages: Message[]
}

const Chat = () => {
    const navigation = useNavigation<ChatProps>()
    const { t } = useTranslation()
    const styles = useStyles(0)
    const { data, isVisible, handleToggle, handleDelete } = useChat()
    const {
        theme: { colors },
    } = useTheme()

    const handleNavigate = useCallback((type: "new" | "view", data?: any) => {
        navigation.navigate(RootStackParamEnum.NewChat, { type: type, messages: data })
    }, [])

    const renderItem = useCallback(({ item }: { item: ItemType }) => {
        return (
            <Pressable style={styles.containerItem} onPress={() => handleNavigate("view", item.messages ?? [])}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textItem} numberOfLines={1}>
                        {item.messages[0]?.content?.toString() ?? ""}
                    </Text>
                    <AppIcon
                        name="ellipsis-horizontal-sharp"
                        type="ionicon"
                        color={colors.black}
                        isPaddingIcon={false}
                        onPress={handleToggle}
                    />
                </View>
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
            <AppActionSheet
                visible={isVisible}
                onClose={handleToggle}
                onBackdropPress={handleToggle}
                actions={[{ title: t("delete"), type: "destructive", onPress: () => {} }]}
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
            flex: 1,
            fontSize: fontSize.large,
        },
        containerItem: {
            paddingHorizontal: padding.base,
            paddingVertical: padding.small,
            gap: spacing.base,
        },
    }
})
