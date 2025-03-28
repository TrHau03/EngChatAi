import { Message } from "@/core/entities/message"
import { borderRadius, fontSize, lineHeight, spacing } from "@/core/theme"
import { logger, Role } from "@/core/utils"
import { Divider, makeStyles, normalize, Text, Tooltip, useTheme } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { useAppSelector, useTTS } from "../hooks"
import AppIcon from "./AppIcon"
import CustomTooltip from "./CusTomToolTip"

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
            <View style={styles.headerAI}>
                <AppIcon
                    name={isSpeaking ? "pause" : "play"}
                    type="ionicon"
                    isPaddingIcon={false}
                    onPress={handleSpeak}
                />
                {/* <Tooltip
                    visible={isTranslated && !!content_translated}
                    onClose={handleTranslate}
                    overlayColor={colors.background}
                    backgroundColor={`${colors.grey5}`}
                    containerStyle={{ width: "auto", maxWidth: "80%", height: "auto" }}
                    popover={
                        <View style={styles.containerTooltip}>
                            <Text style={styles.content}>{content}</Text>
                            <Divider color={colors.primary} />
                            <Text style={styles.content}>{content_translated ?? ""}</Text>
                        </View>
                    }
                >
                    <AppIcon
                        name="g-translate"
                        color={isTranslated ? colors.primary : colors.black}
                        type="material"
                        isPaddingIcon={false}
                        onPress={handleTranslate}
                    />
                </Tooltip> */}
                <View>
                    <CustomTooltip content={content} contentTranslated={content_translated}>
                        <AppIcon name="g-translate" type="material" />
                    </CustomTooltip>
                </View>
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
        containerTooltip: {
            gap: spacing.base,
        },
    }
}) 
