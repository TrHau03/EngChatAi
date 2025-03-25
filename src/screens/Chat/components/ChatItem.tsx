import { AppIcon } from "@/core/components"
import { fontSize, padding, spacing } from "@/core/theme"
import { logger } from "@/core/utils"
import { Divider } from "@rneui/base"
import { makeStyles, Text, useTheme } from "@rneui/themed"
import React from "react"
import { Pressable, View } from "react-native"
import { ChatType } from "../Chat"

interface ChatItemProps {
    item: ChatType
    handleToggle: () => void
    handleNavigate: (type: "new" | "view", data?: any) => void
}

const ChatItem: React.FC<ChatItemProps> = ({ item, handleToggle, handleNavigate }) => {
    logger.object({ item })
    const styles = useStyles(0)
    const {
        theme: { colors },
    } = useTheme()
    return (
        <Pressable style={styles.containerItem} onPress={() => handleNavigate("view", item.messages ?? [])}>
            <View style={styles.content}>
                <Text style={styles.textItem} numberOfLines={1}>
                    {item.title?.toString() ?? ""}
                </Text>
                <AppIcon name="ellipsis-horizontal-sharp" type="ionicon" color={colors.black} onPress={handleToggle} />
            </View>
            <Divider />
        </Pressable>
    )
}

export default ChatItem

const useStyles = makeStyles(({ colors }) => {
    return {
        textItem: {
            flex: 1,
            fontSize: fontSize.large,
        },
        content: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing.medium },
        containerItem: {
            paddingHorizontal: padding.base,
            paddingVertical: padding.small,
            gap: spacing.base,
        },
    }
})
