import { makeStyles, Text, useTheme } from "@rneui/themed"
import React, { memo, useCallback } from "react"
import { View } from "react-native"
import { Word } from "../entities/word"
import { borderRadius, fontSize, spacing } from "../theme"
import AppIcon from "./AppIcon"

interface WordItemProps extends Word {
    onPlayAudio?: (name: string, uri: string) => void
    onStopAudio?: (name: string) => void
}

const WordItem: React.FC<WordItemProps> = (props) => {
    const { word, part_of_speech, level, pronunciation, onPlayAudio, onStopAudio } = props
    const styles = useStyles()
    const {
        theme: { colors },
    } = useTheme()

    const playAudioUS = useCallback(() => {
        if (onPlayAudio) {
            onPlayAudio(word, pronunciation["us"])
        }
    }, [onPlayAudio, word, pronunciation])

    const playAudioUK = useCallback(() => {
        if (onPlayAudio) {
            onPlayAudio(word, pronunciation["uk"])
        }
    }, [onPlayAudio, word, pronunciation])

    return (
        <View style={styles.container}>
            <View style={styles.containerWord}>
                <Text style={styles.textWord}>{word}</Text>
                <Text>{part_of_speech}</Text>
            </View>
            <View style={styles.containerLevel}>
                <Text style={styles.textLevel}>{level}</Text>
            </View>
            <View style={styles.containerVolume}>
                <AppIcon name="volume-high" type={"ionicon"} color={colors.primary} onPress={playAudioUS} />
                <AppIcon name="volume-high" type={"ionicon"} color={colors.warning} onPress={playAudioUK} />
            </View>
        </View>
    )
}

export default memo(WordItem)

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.secondary,
            paddingHorizontal: spacing.large,
            paddingVertical: spacing.medium,
            borderRadius: borderRadius.base,
            gap: spacing.medium,
        },
        containerWord: {
            flex: 1,
            gap: spacing.small,
        },
        textWord: {
            fontSize: fontSize.large,
            color: colors.primary,
            fontWeight: "bold",
        },
        containerLevel: {
            backgroundColor: colors.primary,
            padding: spacing.medium,
            borderRadius: borderRadius.medium,
        },
        textLevel: {
            fontSize: fontSize.base,
            color: colors.black,
            fontWeight: "bold",
        },
        containerVolume: {
            flexDirection: "row",
        },
    }
})
