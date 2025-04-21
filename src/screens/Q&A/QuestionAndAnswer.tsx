import { AppIcon, Wrapper } from "@/core/components"
import { fontSize, padding, spacing } from "@/core/theme"
import { Button, makeStyles, useTheme } from "@rneui/themed"
import React from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import Answers from "./components/Answers"
import { useQAndA } from "./hooks/useQ&A"

const QuestionAndAnswer = () => {
    const { question, step } = useQAndA()
    const { t } = useTranslation()
    const {
        theme: { colors },
    } = useTheme()
    const styles = useStyles()
    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <Text style={styles.textQuestion}>
                {step}: {question?.question}
            </Text>
            <View style={styles.containerAnswer}>
                <Answers answers={question?.answers} />
            </View>
            <View style={styles.containerExplain}>
                <View style={styles.containerHeaderExplain}>
                    <Text style={styles.textExplain}>{t("explain")}</Text>
                    <View style={styles.containerHeaderRightExplain}>
                        <AppIcon name="g-translate" type="material" color={colors.white} isPaddingIcon />
                        <AppIcon name="play" type="ionicon" color={colors.white} isPaddingIcon />
                    </View>
                </View>
                <Text style={styles.textContentExplain}>{question.explain}</Text>
            </View>
            <Button title={t("continue")} />
        </Wrapper>
    )
}

export default QuestionAndAnswer

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            paddingHorizontal: padding.medium,
            paddingVertical: padding.base,
            gap: spacing.medium,
        },
        containerAnswer: {
            gap: spacing.base,
        },
        textQuestion: {
            fontSize: fontSize.large,
        },
        containerExplain: {
            flex: 1,
            gap: spacing.base,
        },
        textExplain: {
            fontSize: fontSize.large,
            fontWeight: "bold",
            flex: 1,
        },
        textContentExplain: {
            fontSize: fontSize.medium,
        },
        containerHeaderExplain: {
            flexDirection: "row",
            alignItems: "center",
        },
        containerHeaderRightExplain: {
            flexDirection: "row",
        },
    }
})
