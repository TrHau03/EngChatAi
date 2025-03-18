import { AppIcon, MessageItem, Wrapper } from "@/core/components"
import InputBar from "@/core/components/InputBar"
import { Message } from "@/core/entities/message"
import { useAppDispatch } from "@/core/hooks"
import { fontSize, padding, spacing } from "@/core/theme"
import { generateID, logger } from "@/core/utils"
import { NewChatProps } from "@/navigation/stack/RootStack"
import { appActions } from "@/redux/reducers/App/appSlice"
import { chatActions } from "@/redux/reducers/Chat/chatSlice"
import { usePreventRemove } from "@react-navigation/native"
import { makeStyles, useTheme } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, FlatList, KeyboardAvoidingView, Platform } from "react-native"
import { useNewChat } from "./hooks/useNewChat"

const NewChat = ({ route, navigation }: NewChatProps) => {
    const styles = useStyles()
    const {
        params: { type, messages },
    } = route
    const isNewChat = type === "new"
    const {
        theme: { colors },
    } = useTheme()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const flatListRef = React.useRef<FlatList>(null)
    const { data, onSubmit, setData } = useNewChat(type)
    const [isNext, setIsNext] = useState(false)
    const behavior = Platform.OS === "ios" ? "padding" : "height"

    usePreventRemove(isNewChat, (e) => {
        if (data.length > 0 && !isNext) {
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
        } else {
            navigation.dispatch(e.data.action)
        }
    })

    React.useEffect(() => {
        logger.object(data)
        navigation.setOptions({
            headerShown: true,
            headerRight: () => {
                if (isNewChat && data.length > 0) {
                    return (
                        <AppIcon
                            name="checkmark-done-sharp"
                            type="ionicon"
                            color={colors.primary}
                            onPress={handleSave}
                        />
                    )
                } else {
                    return null
                }
            },
        })
    }, [navigation, t, data])

    React.useEffect(() => {
        scrollToBottom()
    }, [data])

    const handleGoBack = useCallback(
        (e: any) => {
            navigation.dispatch(e.data.action)
            isNewChat && setData([])
        },
        [data, navigation],
    )

    const handleSave = () => {
        dispatch(appActions.updateState({ isLoading: true }))
        setIsNext(true)
        dispatch(chatActions.updateChat({ _id: generateID(), name: data[0].content, messages: data }))
        setTimeout(() => {
            dispatch(appActions.updateState({ isLoading: false }))
            navigation.goBack()
        }, 1000)
    }

    const scrollToBottom = useCallback(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
    }, [flatListRef.current])

    const renderItem = useCallback(({ item }: any) => {
        return <MessageItem {...item} />
    }, [])

    const keyExtractor = useCallback((item: Message) => item._id.toString(), [])

    return (
        <Wrapper isSafeArea edges={["bottom"]} containerStyle={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                <FlatList
                    contentInsetAdjustmentBehavior="automatic"
                    ref={flatListRef}
                    data={isNewChat ? data : (messages as any)}
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
                {isNewChat && <InputBar onSubmit={onSubmit} />}
            </KeyboardAvoidingView>
        </Wrapper>
    )
}

export default NewChat

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: padding.medium,
        },
        containerList: { flexGrow: 1, justifyContent: "flex-end", gap: spacing.base, paddingVertical: padding.base },
        textSave: {
            color: colors.primary,
            fontSize: fontSize.medium,
            fontWeight: "bold",
        },
    }
})
