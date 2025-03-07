import { AppIcon, Wrapper } from "@/core/components"
import { fontSize, padding, spacing } from "@/core/theme"
import { ChatProps, RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { Divider, makeStyles, Text, useTheme } from "@rneui/themed"
import React, { useCallback } from "react"
import { FlatList, View } from "react-native"

const sampleData = [
    {
        id: 1,
        firstMessage: "John Doe",
    },
    {
        id: 2,
        firstMessage: "Jane Doe",
    },
    {
        id: 3,
        firstMessage: "John Doe",
    },
]

interface ItemType {
    id: any
    firstMessage: string
}

const Chat = () => {
    const navigation = useNavigation<ChatProps>()
    const styles = useStyles(0)
    const {
        theme: { colors },
    } = useTheme()

    const handleNavigate = useCallback(() => {
        navigation.navigate(RootStackParamEnum.NewChat)
    }, [])

    const renderItem = useCallback(({ item }: { item: ItemType }) => {
        return (
            <View style={styles.containerItem}>
                <Text style={styles.textItem}>{item.firstMessage}</Text>
                <Divider />
            </View>
        )
    }, [])

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <AppIcon
                name="add"
                type="ionicon"
                isPaddingIcon
                size={32}
                containerStyles={styles.addIcon}
                color={colors.primary}
                onPress={handleNavigate}
            />
            <FlatList data={sampleData} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
        </Wrapper>
    )
}

export default Chat

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: padding.base,
        },
        addIcon: { alignSelf: "flex-end" },
        textItem: {
            fontSize: fontSize.xl,
        },
        containerItem: {
            paddingHorizontal: padding.base,
            paddingVertical: padding.small,
            gap: spacing.base,
        },
    }
})
