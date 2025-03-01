import { Wrapper } from "@/components"
import { ChatProps, RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { Button, makeStyles } from "@rneui/themed"
import React from "react"
import { Text } from "react-native"

const Chat = () => {
    const navigation = useNavigation<ChatProps>()
    const styles = useStyles(0)

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <Text>Chat</Text>
            <Button title={"NewChat"} onPress={() => navigation.navigate(RootStackParamEnum.NewChat)} />
        </Wrapper>
    )
}

export default Chat

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
        },
    }
})
