import { makeStyles, normalize, Text } from "@rneui/themed"
import LottieView from "lottie-react-native"
import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { fontSize, margin, padding, spacing } from "../theme"

interface EmptyListProps {
    message?: string
}

const EmptyList: React.FC<EmptyListProps> = (props) => {
    const styles = useStyles()
    const { t } = useTranslation()
    return (
        <View style={styles.containerEmpty}>
            <LottieView
                source={require("@/assets/animations/empty.json")}
                autoPlay
                loop
                style={{ width: normalize(248), aspectRatio: 1 }}
            />
            <Text style={styles.textEmpty}>{t(props.message || "notThings")}</Text>
        </View>
    )
}

export default EmptyList

const useStyles = makeStyles(({}) => {
    return {
        containerEmpty: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: spacing.base,
            paddingHorizontal: padding.medium,
        },
        textEmpty: { fontSize: fontSize.large, fontWeight: "bold", marginBottom: margin.medium },
    }
})
