import { makeStyles, useTheme } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { TextInput, View } from "react-native"
import { useDebounce } from "../hooks/useDebounce"
import { borderRadius, fontSize, spacing } from "../theme"
import AppIcon from "./AppIcon"

interface SearchBarProps {
    onChangeText: (text: string) => void
    placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { onChangeText } = props
    const { t } = useTranslation()
    const styles = useStyles(0)
    const {
        theme: { colors },
    } = useTheme()
    const [input, setInput] = useState<string | null>(null)
    const debouncedValue = useDebounce(input, 500)

    React.useEffect(() => {
        if (debouncedValue !== null) {
            onChangeText(debouncedValue)
        }
    }, [debouncedValue])

    const handleClearText = useCallback(() => {
        setInput("")
    }, [])

    return (
        <View style={styles.container}>
            <AppIcon name="search" type={"ionicon"} isPaddingIcon={false} color={colors.grey4} />
            <TextInput
                value={input ?? ""}
                onChangeText={setInput}
                style={styles.input}
                placeholder={props.placeholder || t("search")}
                placeholderTextColor={colors.black}
            />
            {input && (
                <AppIcon
                    onPress={handleClearText}
                    name="close"
                    type={"ionicon"}
                    color={colors.grey4}
                    isPaddingIcon={false}
                />
            )}
        </View>
    )
}

export default SearchBar

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flexDirection: "row",
            paddingVertical: spacing.medium,
            paddingHorizontal: spacing.medium,
            borderWidth: 1,
            borderColor: colors.grey5,
            borderRadius: borderRadius.base,
            gap: spacing.base,
        },
        input: {
            flex: 1,
            fontSize: fontSize.medium,
            color: colors.black,
        },
    }
})
