import { makeStyles, Text, useTheme } from "@rneui/themed"
import React from "react"
import { useTranslation } from "react-i18next"
import { Modal, Pressable, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { borderRadius, fontSize, margin, padding, spacing } from "../theme"

interface AppActionSheetProps {
    visible?: boolean
    onClose?: () => void
    onBackdropPress?: () => void
    descriptions?: {
        title: string
        description: string
    }
    actions?: { title: string; type: "default" | "destructive"; onPress: () => void }[]
}

const AppActionSheet: React.FC<AppActionSheetProps> = (props) => {
    const styles = useStyles(0)
    const {
        theme: { colors },
    } = useTheme()
    const { t } = useTranslation()
    const insets = useSafeAreaInsets()

    return (
        <Modal visible={props.visible} transparent style={{ flex: 1 }} animationType="slide">
            <View style={styles.containerModal}>
                <Pressable style={styles.backdrop} onPress={props.onBackdropPress} />
                <View style={[styles.container, { marginBottom: insets.bottom }]}>
                    <View style={styles.containerItem}>
                        {props.descriptions && (
                            <View style={styles.containerDescription}>
                                <Text style={styles.textTitle}>{props.descriptions.title}</Text>
                                <Text style={styles.textDesc}>{props.descriptions.description}</Text>
                            </View>
                        )}
                        {props.actions &&
                            props.actions.map((action, index) => {
                                return (
                                    <Pressable
                                        key={index}
                                        onPress={action.onPress}
                                        style={[
                                            styles.containerAction,
                                            { borderTopWidth: !props.descriptions && index === 0 ? 0 : 1 },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.textAction,
                                                {
                                                    color: action.type === "destructive" ? "#F84339" : colors.primary,
                                                },
                                            ]}
                                        >
                                            {t(action.title)}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                    </View>
                    <Pressable
                        style={[styles.containerItem, { paddingVertical: padding.large }]}
                        onPress={props.onClose}
                    >
                        <Text style={[styles.textAction, { color: "#F84339" }]}>{t("cancel")}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default AppActionSheet

const useStyles = makeStyles(({ colors }) => {
    return {
        containerModal: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
        },
        container: {
            width: "100%",
            padding: padding.medium,
            gap: spacing.medium,
        },
        containerItem: {
            backgroundColor: "#202020",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: borderRadius.large,
        },
        containerDescription: {
            justifyContent: "center",
            alignItems: "center",
            marginVertical: margin.medium,
        },
        containerAction: {
            width: "100%",
            borderTopWidth: 1,
            borderColor: "#606062",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: padding.large,
        },
        textTitle: {
            fontSize: fontSize.medium,
            color: "#989B9C",
            fontWeight: "bold",
        },
        textDesc: {
            fontSize: fontSize.medium,
            color: "#989B9C",
        },
        textAction: {
            fontSize: fontSize.large,
        },
        backdrop: { flex: 1, width: "100%", height: "100%" },
    }
})
