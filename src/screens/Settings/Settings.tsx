import { AppIcon, Wrapper } from "@/components"
import { logOut } from "@/func"
import { SettingsScreenNavigationProp } from "@/navigation/bottom/RootTab"
import { RootStackParamEnum } from "@/navigation/stack/RootStack"
import { spacing } from "@/theme"
import { device } from "@/utils"
import { useNavigation } from "@react-navigation/native"
import { Button, makeStyles, Text, useTheme } from "@rneui/themed"
import React, { useCallback } from "react"
import { Pressable, View } from "react-native"


const Settings = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>()
    const styles = useStyles(0)
    const { theme: { colors } } = useTheme()
    const handleLogout = useCallback(async () => {
        const result = await logOut()
        result && navigation.navigate(RootStackParamEnum.Auth)
    }, [])

    return (
        <Wrapper containerStyle={styles.container}>
            <Text style={styles.title}>Settings</Text>
            
            <Button title="Logout" onPress={handleLogout} />
        </Wrapper>
    )
}

export default Settings

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: spacing.base,
        },
        title: {
            color: colors.black,
            padding: spacing.large,
            alignSelf: 'center',

        },
    }
})
