import { makeStyles, Text } from "@rneui/themed"
import React from "react"
import { Modal, View } from "react-native"
import { borderRadius, margin, padding, spacing } from "../theme"

interface AppActionSheetProps {
    actions?: { title: string; type: "default" | "destructive"; onPress: () => void }[]
}

const AppActionSheet: React.FC<AppActionSheetProps> = (props) => {
    const styles = useStyles(0)
    return (
        <Modal visible={true} transparent style={{ flex: 1 }}>
            <View style={styles.containerModal}>
                <View style={styles.container}>
                    <View style={styles.containerItem}>
                        <Text>Helo</Text>
                    </View>
                    <View style={styles.containerItem}>
                        <Text>Hello</Text>
                    </View>
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
            margin: margin.base,
            padding: padding.base,
            marginBottom: 200,
            gap: spacing.medium,
        },
        containerItem: {
            width: "98%",
            backgroundColor: "#202020",
            paddingVertical: padding.large,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: borderRadius.large,
        },
    }
})
