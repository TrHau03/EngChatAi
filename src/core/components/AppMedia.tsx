import { Divider, makeStyles, Tooltip, useTheme } from "@rneui/themed"
import React from "react"
import { Text, View } from "react-native"
import { fontSize, lineHeight, spacing } from "../theme"
import AppIcon from "./AppIcon"

interface AppMediaProps {
    isSpeaking: boolean
    isTranslated: boolean
    content: string
    content_translated?: string
    handleTranslate: () => void
    handleSpeak: () => void
}

const AppMedia = (props: AppMediaProps) => {
    const { isSpeaking, isTranslated, content, content_translated, handleSpeak, handleTranslate } = props
    const {
        theme: { colors },
    } = useTheme()
    const styles = useStyles(0)
    return (
        <View style={styles.container}>
            <AppIcon name={isSpeaking ? "pause" : "play"} type="ionicon" isPaddingIcon={false} onPress={handleSpeak} />
            <Tooltip
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
            </Tooltip>
        </View>
    )
}
export default AppMedia

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.large,
        },
        content: {
            fontSize: fontSize.normal,
            lineHeight: lineHeight.large,
        },
        containerTooltip: {
            gap: spacing.base,
        },
    }
})
