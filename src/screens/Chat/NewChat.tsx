import { MessageItem, Wrapper } from "@/components"
import InputBar from "@/components/InputBar"
import { NewChatProps } from "@/navigation/stack/RootStack"
import { spacing } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { makeStyles } from "@rneui/themed"
import React, { useCallback } from "react"
import { FlatList, KeyboardAvoidingView, Platform } from "react-native"

const NewChat = () => {
    const styles = useStyles()
    const navigation = useNavigation<NewChatProps>()
    const behavior = Platform.OS === "ios" ? "padding" : "height"
    const data = [
        {
            isOwner: true,
            content: "Hello",
        },
        {
            isOwner: false,
            content: "Hello",
        },
        {
            isOwner: true,
            content: "Hello",
        },
    ]

    const renderItem = useCallback(({ item }: any) => {
        return <MessageItem isOwner={item.isOwner} content={item.content} />
    }, [])

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
                {/* <View style={{ flex: 1 }}></View> */}
                <FlatList data={data} renderItem={renderItem} />
                <InputBar />
            </KeyboardAvoidingView>
        </Wrapper>
    )
}

export default NewChat

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: spacing.base,
        },
    }
})
