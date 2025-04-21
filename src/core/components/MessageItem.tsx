import { Message } from "@/core/entities/message"
import { borderRadius, fontSize, lineHeight, spacing } from "@/core/theme"
import { logger, Role } from "@/core/utils"
import { Divider, makeStyles, normalize, Text, useTheme } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { useAppSelector, useTTS } from "../hooks"

const MessageItem: React.FC<Message> = ({ _id, role, content, content_translated }) => {
    const styles = useStyles(role)
    const {
        theme: { colors },
    } = useTheme()
    const { speak, stop } = useTTS()
    const isSpeaking = useAppSelector((state) => {
        return state.root.app.tts.id === _id.toString() && state.root.app.tts.isSpeaking
    })
    const [isTranslated, setIsTranslated] = useState(false)

    logger.info("render MessageItem", _id)

    const handleSpeak = useCallback(() => {
        if (isSpeaking) {
            stop()
        } else {
            speak(_id.toString(), content)
        }
    }, [isSpeaking])

    const handleTranslate = useCallback(() => {
        setIsTranslated((prev) => !prev)
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
            <Divider color={colors.primary} />
            <Text style={styles.content}>{content}</Text>
        </View>
    )
}

export default MessageItem

const useStyles = makeStyles(({ colors }, role) => {
    return {
        container: {
            alignSelf: role === Role.USER ? "flex-end" : "flex-start",
            padding: spacing.medium,
            borderRadius: borderRadius.large,
            gap: spacing.base,
        },
        containerOwner: {
            maxWidth: "80%",
            backgroundColor: colors.primary,
        },
        containerAI: {
            width: "80%",
            backgroundColor: colors.secondary,
        },
        logoAI: {
            width: normalize(48),
            height: normalize(48),
            borderRadius: normalize(48),
        },
        content: {
            fontSize: fontSize.normal,
            lineHeight: lineHeight.large,
        },
    }
})
