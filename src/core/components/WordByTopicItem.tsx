import React, { useCallback } from 'react'
import { View } from "react-native"
import { WordByTopic } from '@/redux/reducers/Topic/topicsType'
import { makeStyles, Text, useTheme } from "@rneui/themed"
import { borderRadius, fontSize, spacing } from "../theme"
import AppIcon from "./AppIcon"

interface WordByTopicItemProps extends WordByTopic {
    onPlayAudio?: (name: string, uri: string) => void
    onStopAudio?: (name: string) => void
}

const WordByTopicItem: React.FC<WordByTopicItemProps> = (props) => {
    const { word, part_of_speech, topic, pronunciation, onPlayAudio, onStopAudio } = props
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
            <View style={styles.containerVolume}>
                <AppIcon name="volume-high" type={"ionicon"} color={colors.primary} onPress={playAudioUS} />
                <AppIcon name="volume-high" type={"ionicon"} color={colors.warning} onPress={playAudioUK} />
            </View>
        </View>
    )
}

export default WordByTopicItem

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