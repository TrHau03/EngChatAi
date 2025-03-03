import { logOut } from "@/core/func"
import { SettingsScreenNavigationProp } from "@/navigation/bottom/RootTab"
import { RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { Button } from "@rneui/themed"
import React, { useCallback } from "react"
import { Text, View } from "react-native"

const Settings = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>()
    const handleLogout = useCallback(async () => {
        const result = await logOut()
        result && navigation.navigate(RootStackParamEnum.Auth)
    }, [])
    return (
        <View>
            <Text>Settings</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    )
}

export default Settings
