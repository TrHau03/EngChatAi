import { makeStyles, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

interface MessageItemProps {
    isOwner: boolean
    content: string
}

const MessageItem: React.FC<MessageItemProps> = ({ isOwner, content }) => {
    const styles = useStyles(isOwner)

    if (isOwner) {
        return (
            <View style={[styles.container, styles.containerOwner]}>
                <Text>{content}</Text>
            </View>
        )
    }
    return (
        <View style={[styles.container, styles.containerAI]}>
            <Text>{content}</Text>
        </View>
    )
}

export default MessageItem

const useStyles = makeStyles(({ colors }, isOwner) => {
    return {
        container: {
            maxWidth: "80%",
            alignSelf: isOwner ? "flex-end" : "flex-start",
        },
        containerOwner: {
            backgroundColor: colors.primary,
        },
        containerAI: {
            backgroundColor: colors.disabled,
        },
    }
})
