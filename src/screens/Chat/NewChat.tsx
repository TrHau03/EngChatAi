import { Wrapper } from "@/components"
import InputBar from "@/components/InputBar"
import { NewChatProps } from "@/navigation/stack/RootStack"
import { spacing } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { makeStyles } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

const NewChat = () => {
    const styles = useStyles()
    const navigation = useNavigation<NewChatProps>()
    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <View style={{ flex: 1 }}></View>
            <InputBar />
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
