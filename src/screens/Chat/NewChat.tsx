import { MessageItem, Wrapper } from "@/core/components"
import InputBar from "@/core/components/InputBar"
import { spacing } from "@/core/theme"
import { NewChatProps } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { makeStyles } from "@rneui/themed"
import React, { useCallback } from "react"
import { FlatList, KeyboardAvoidingView, Platform } from "react-native"
import { useNewChat } from "./hooks/useNewChat"

const NewChat = () => {
    const styles = useStyles()
    const navigation = useNavigation<NewChatProps>()
    const flatListRef = React.useRef<FlatList>(null)
    const { data, onSubmit } = useNewChat()
    const behavior = Platform.OS === "ios" ? "padding" : "height"

    React.useEffect(() => {
        scrollToBottom()
    }, [data])

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true })
    }

    const renderItem = useCallback(({ item }: any) => {
        return <MessageItem role={item.role} content={item.content} />
    }, [])

    const keyExtractor = useCallback((item: any) => item.id, [])

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    extraData={data}
                    showsVerticalScrollIndicator={false}
                    maxToRenderPerBatch={10}
                    initialNumToRender={10}
                    windowSize={10}
                    removeClippedSubviews
                    contentContainerStyle={styles.containerList}
                />
                <InputBar onSubmit={onSubmit} />
            </KeyboardAvoidingView>
        </Wrapper>
    )
}

export default NewChat

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: spacing.medium,
        },
        containerList: { flexGrow: 1, justifyContent: "flex-end", gap: spacing.base },
    }
})
