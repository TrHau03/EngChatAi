import { margin, spacing } from "@/theme"
import { makeStyles, normalize, useTheme } from "@rneui/themed"
import React, { useState } from "react"
import { TextInput, View } from "react-native"
import AppIcon from "./AppIcon"

interface InputBarProps {
    onSubmit: (value: string) => void
}

const InputBar: React.FC<InputBarProps> = (props) => {
    const styles = useStyles(0)
    const {
        theme: { colors },
    } = useTheme()
    const [input, setInput] = useState("")

    const onSubmit = () => {
        setInput("")
        props.onSubmit(input)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    style={styles.input}
                    autoComplete="off"
                    spellCheck={false}
                    autoCorrect={false}
                    selectionColor={colors.primary}
                />
            </View>
            <AppIcon
                name={input.trim().length > 0 ? "send" : "mic"}
                type="ionicon"
                color={colors.primary}
                isPaddingIcon
                onPress={onSubmit}
            />
        </View>
    )
}

export default InputBar

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flexDirection: "row",
            paddingTop: spacing.base,
            gap: spacing.small,
        },
        containerInput: {
            flex: 1,
            height: normalize(36),
            justifyContent: "center",
            backgroundColor: `${colors.disabled}90`,
            borderRadius: normalize(36),
            paddingHorizontal: spacing.medium,
            marginBottom: margin.base,
        },
        input: {
            color: colors.black,
        },
    }
})
