import { Message } from "@/core/entities/message"
import { borderRadius, fontSize, lineHeight, spacing } from "@/core/theme"
import { logger, Role } from "@/core/utils"
import { Divider, makeStyles, normalize, Text, useTheme } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { useAppSelector, useTTS } from "../hooks"
import AppIcon from "./AppIcon"

const MessageItem: React.FC<Message> = ({ id, role, content, content_translated }) => {
    const styles = useStyles(role)
    const {
        theme: { colors },
    } = useTheme()
    const { speak, stop } = useTTS()
    const isSpeaking = useAppSelector((state) => {
        return state.root.app.tts.id === id && state.root.app.tts.isSpeaking
    })
    const [isTranslated, setIsTranslated] = useState(false)

    logger.info("render MessageItem", id)

    const handleSpeak = useCallback(() => {
        if (isSpeaking) {
            stop()
        } else {
            speak(id, content)
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
            <View style={styles.headerAI}>
                <AppIcon
                    name={isSpeaking ? "pause" : "play"}
                    type="ionicon"
                    isPaddingIcon={false}
                    onPress={handleSpeak}
                />
                <AppIcon name="g-translate" type="material" isPaddingIcon={false} onPress={handleTranslate} />
            </View>
            <Divider color={colors.primary} />
            <Text style={styles.content}>{content}</Text>
            {isTranslated && (
                <>
                    <Divider color={colors.primary} />
                    <Text style={styles.content}>{content_translated ?? ""}</Text>
                </>
            )}
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
