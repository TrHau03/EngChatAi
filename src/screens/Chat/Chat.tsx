import { AppActionSheet, AppIcon, Wrapper } from "@/core/components"
import { Message } from "@/core/entities/message"
import { fontSize, margin, padding, spacing } from "@/core/theme"
import { ChatProps, RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { makeStyles, normalize, Text, useTheme } from "@rneui/themed"
import LottieView from "lottie-react-native"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, View } from "react-native"
import ChatItem from "./components/ChatItem"
import { useChat } from "./hooks/useChat"

export interface ChatType {
    _id: string
    name: string
    messages: Message[]
}

const Chat = () => {
    const navigation = useNavigation<ChatProps>()
    const { t } = useTranslation()
    const styles = useStyles(0)
    const { data, isVisible, handleToggle, handleDelete } = useChat()
    const {
        theme: { colors },
    } = useTheme()

    const handleNavigate = useCallback((type: "new" | "view", data?: any) => {
        navigation.navigate(RootStackParamEnum.NewChat, { type: type, messages: data })
    }, [])

    const renderItem = useCallback(({ item }: { item: ChatType }) => {
        return <ChatItem item={item} handleToggle={handleToggle} handleNavigate={handleNavigate} />
    }, [])

    if (data.length === 0) {
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
                <View style={styles.containerEmpty}>
                    <LottieView
                        source={require("@/assets/animations/empty.json")}
                        autoPlay
                        loop
                        style={{ width: normalize(248), aspectRatio: 1 }}
                    />
                    <Text style={styles.textEmpty}>{t("notThings")}</Text>
                </View>
            </Wrapper>
        )
    }

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
                data={data.reverse() ?? []}
                keyExtractor={(item: ChatType, index) => index.toString()}
                renderItem={renderItem}
                extraData={data}
                maxToRenderPerBatch={10}
            />
            <AppActionSheet
                visible={isVisible}
                onClose={handleToggle}
                onBackdropPress={handleToggle}
                actions={[{ title: t("delete"), type: "destructive", onPress: () => {} }]}
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
