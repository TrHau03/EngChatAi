import { borderRadius, fontSize, spacing } from "@/core/theme"
import { makeStyles, normalize } from "@rneui/themed"
import React from "react"
import { Pressable, Text, View } from "react-native"

interface AnswerProps {
    isCorrected: boolean
    isSelected: boolean
    position: string
    answer: string
    answer_translated: string
    handleSelected: (position: string) => void
}

const Answer: React.FC<AnswerProps> = (props) => {
    const { isCorrected, isSelected, answer, position, handleSelected } = props
    const styles = useStyles({ isCorrected, isSelected })
    return (
        <Pressable style={styles.answer} onPress={() => handleSelected(position)}>
            <View style={[styles.container, styles.containerPosition]}>
                <Text style={styles.textAnswer}>{position}</Text>
            </View>
            <View style={[styles.container, { flex: 1, height: normalize(48) }]}>
                <Text style={styles.textAnswer}>{answer}</Text>
            </View>
        </Pressable>
    )
}

export default Answer

const useStyles = makeStyles(({ colors }, data: any) => {
    const { isCorrected, isSelected } = data
    return {
        answer: {
            flexDirection: "row",
            width: "100%",
            gap: spacing.base,
            alignItems: "center",
        },

        textAnswer: {
            fontSize: fontSize.large,
            lineHeight: fontSize.large,
            color: isSelected ? colors.black : colors.white,
        },
        container: {
            justifyContent: "center",
            alignItems: "center",
            padding: spacing.medium,
            borderRadius: borderRadius.medium,
            backgroundColor:
                isCorrected && isSelected ? colors.success : !isCorrected && isSelected ? colors.error : colors.black,
        },
        containerPosition: {
            width: normalize(48),
            aspectRatio: 1,
        },
    }
})
