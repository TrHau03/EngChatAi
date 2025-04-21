import { AppActionSheet, AppIcon, EmptyList, Wrapper } from "@/core/components"
import { Message } from "@/core/entities/message"
import { fontSize, margin, padding, spacing } from "@/core/theme"
import { ChatProps, RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { makeStyles, useTheme } from "@rneui/themed"
import React, { useCallback, useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, RefreshControl } from "react-native"
import ChatItem from "./components/ChatItem"
import { useChat } from "./hooks/useChat"

export interface ChatType {
    _id: string
    title: string
    messages: Message[]
}

const Chat = () => {
    const navigation = useNavigation<ChatProps>()
    const { t } = useTranslation()
    const styles = useStyles(0)
    const {
        theme: { colors },
    } = useTheme()
    const { data, isVisible, isFetching, isLoading, handleToggle, handleDelete, refetch } = useChat()
    const itemId = useRef<string>("")
    const handleNavigate = useCallback((type: "new" | "view", data?: any) => {
        navigation.navigate(RootStackParamEnum.NewChat, { type: type, messages: data })
    }, [])

    const renderItem = useCallback(({ item }: { item: ChatType }) => {
        return (
            <ChatItem
                item={item}
                handleToggle={() => {
                    handleToggle()
                    itemId.current = item._id
                }}
                handleNavigate={handleNavigate}
            />
        )
    }, [])

    const onRefresh = useCallback(() => {
        refetch()
    }, [])

    const refreshControl = useMemo(() => {
        return (
            <RefreshControl
                refreshing={isFetching}
                onRefresh={onRefresh}
                colors={[colors.primary]}
                tintColor={colors.primary}
            />
        )
    }, [isFetching])

    const renderEmpty = useCallback(() => {
        return <EmptyList />
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
                onPress={() => handleNavigate("new")}
            />
            <FlatList
                data={data.length > 0 ? data.reverse() : []}
                keyExtractor={(item: ChatType, index) => index.toString()}
                renderItem={renderItem}
                extraData={data}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                contentContainerStyle={{ flex: 1 }}
                ListEmptyComponent={data.length > 0 && (!isLoading || !isFetching) ? null : renderEmpty}
                refreshControl={refreshControl}
            />
            <AppActionSheet
                visible={isVisible}
                onClose={handleToggle}
                onBackdropPress={handleToggle}
                actions={[
                    {
                        title: t("delete"),
                        type: "destructive",
                        onPress: () => {
                            handleDelete(itemId.current)
                        },
                    },
                ]}
            />
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
