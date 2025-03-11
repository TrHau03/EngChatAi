import { AppIcon, MessageItem, Wrapper } from "@/core/components"
import InputBar from "@/core/components/InputBar"
import { Message } from "@/core/entities/message"
import { fontSize, spacing } from "@/core/theme"
import { Chat } from "@/db/Chat"
import { NewChatProps } from "@/navigation/stack/RootStack"
import { useNavigation, usePreventRemove } from "@react-navigation/native"
import { makeStyles, useTheme } from "@rneui/themed"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Alert, FlatList, KeyboardAvoidingView, Platform } from "react-native"
import { List } from "realm"
import { useNewChat } from "./hooks/useNewChat"

const NewChat = () => {
    const styles = useStyles()
    const {
        theme: { colors },
    } = useTheme()
    const { t } = useTranslation()
    const navigation = useNavigation<NewChatProps>()
    const flatListRef = React.useRef<FlatList>(null)
    const { data, realm, onSubmit } = useNewChat()
    const behavior = Platform.OS === "ios" ? "padding" : "height"

    usePreventRemove(true, (e) => {
        if (data.length === 0) {
            navigation.dispatch(e.data.action)
            return
        }
        Alert.alert(t("doYouWantToLeaveThisChat"), t("youCanNotRecoverThisChat"), [
            {
                text: t("cancel"),
                style: "cancel",
            },
            {
                text: t("leave"),
                style: "destructive",
                onPress: () => handleGoBack(e),
            },
        ])
    })

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <AppIcon name="checkmark-done-sharp" type="ionicon" color={colors.primary} onPress={handleSave} />
            ),
        })
    }, [navigation, t])

    React.useEffect(() => {
        scrollToBottom()
    }, [data])

    const handleGoBack = useCallback(
        (e: any) => {
            navigation.dispatch(e.data.action)
            realm.write(() => {
                realm.delete(data)
            })
        },
        [data, navigation, realm],
    )

    const handleSave = useCallback(() => {
        if (data.length > 0) {
            realm.write(() => {
                realm.create("Chat", Chat.generate(data as unknown as List<Message>))
            })
            return
        }
        Alert.alert(t("notification"), t("chatIsEmpty"))
    }, [data])

    const scrollToBottom = useCallback(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
    }, [])

    const renderItem = useCallback(({ item }: any) => {
        return <MessageItem {...item} />
    }, [])

    const keyExtractor = useCallback((item: Message) => item._id.toHexString(), [])

    return (
        <Wrapper isSafeArea edges={["bottom"]} containerStyle={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                <FlatList
                    ref={flatListRef}
                    data={data as any}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    extraData={data}
                    showsVerticalScrollIndicator={false}
                    maxToRenderPerBatch={10}
                    initialNumToRender={10}
                    windowSize={10}
                    removeClippedSubviews
                    contentContainerStyle={styles.containerList}
                    onLayout={scrollToBottom}
                    snapToEnd
                    onContentSizeChange={scrollToBottom}
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
        textSave: {
            color: colors.primary,
            fontSize: fontSize.medium,
            fontWeight: "bold",
            backgroundColor: "red",
        },
    }
})
