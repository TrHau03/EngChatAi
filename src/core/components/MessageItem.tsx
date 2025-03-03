import { Message } from "@/core/entities/message"
import { borderRadius, fontSize, lineHeight, spacing } from "@/core/theme"
import { Role } from "@/core/utils"
import { Divider, makeStyles, normalize, Text, useTheme } from "@rneui/themed"
import React, { useCallback } from "react"
import { View } from "react-native"
import { useTTS } from "../hooks"
import AppIcon from "./AppIcon"

const MessageItem: React.FC<Partial<Message>> = ({ role, content }) => {
    const styles = useStyles(role)
    const {
        theme: { colors },
    } = useTheme()
    const { isSpeaking, speak, stop } = useTTS()

    const handleSpeak = useCallback(() => {
        if (isSpeaking) {
            stop()
        } else {
            speak(content)
        }
    }, [])

    if (!role || !content) return null
    if (role === Role.USER) {
        return (
            <View style={[styles.container, styles.containerOwner]}>
                <Text style={styles.content}>{content}</Text>
            </View>
        )
    }
    return (
        <View style={[styles.container, styles.containerAI]}>
            <View style={styles.headerAI}>
                <AppIcon
                    name={isSpeaking ? "pause" : "play"}
                    type="ionicon"
                    isPaddingIcon={false}
                    onPress={handleSpeak}
                />
                <AppIcon name="g-translate" type="material" isPaddingIcon={false} />
            </View>
            <Divider color={colors.primary} />
            <Text style={styles.content}>{content}</Text>
        </View>
    )
}

export default MessageItem

const useStyles = makeStyles(({ colors }, role) => {
    return {
        container: {
            width: "80%",
            alignSelf: role === Role.USER ? "flex-end" : "flex-start",
            padding: spacing.medium,
            borderRadius: borderRadius.large,
            gap: spacing.base,
        },
        containerOwner: {
            backgroundColor: colors.primary,
        },
        containerAI: {
            backgroundColor: colors.secondary,
        },
        content: {
            fontSize: fontSize.normal,
            lineHeight: lineHeight.large,
        },
        headerAI: {
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.large,
        },
        logoAI: {
            width: normalize(48),
            height: normalize(48),
            borderRadius: normalize(48),
        },
    }
})
