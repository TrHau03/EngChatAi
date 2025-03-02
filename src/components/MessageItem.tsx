import { Message } from "@/entities/message"
import { Role } from "@/utils"
import { makeStyles, Text } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

const MessageItem: React.FC<Message> = ({ role, content }) => {
    const styles = useStyles(role)

    if (role === Role.USER) {
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

const useStyles = makeStyles(({ colors }, role) => {
    return {
        container: {
            maxWidth: "80%",
            alignSelf: role === Role.USER ? "flex-end" : "flex-start",
        },
        containerOwner: {
            backgroundColor: colors.primary,
        },
        containerAI: {
            backgroundColor: colors.disabled,
        },
    }
})
