import { Wrapper } from "@/components"
import { googleAuthentication, logOut } from "@/func/googleAuth"
import { TabNavigationProp } from "@/navigation/bottom/RootTab"
import { RootStackParamEnum } from "@/navigation/stack/RootStack"
import { linearGradient } from "@/theme"
import { logger } from "@/utils"
import { useNavigation } from "@react-navigation/native"
import { Button, Image, Text } from "@rneui/themed"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useStyles } from "./styles"

const SignIn = () => {
    const styles = useStyles(0)
    const { t } = useTranslation()
    const navigation = useNavigation<TabNavigationProp>()

    const handleLoginGoogle = useCallback(async () => {
        const result = await googleAuthentication()
        logger.info("result", result)
        if (result) {
            navigation.reset({
                index: 0,
                routes: [{ name: RootStackParamEnum.Tab }],
            })
        }
    }, [])

    const handleSignOut = useCallback(async () => {
        await logOut()
    }, [])

    return (
        <Wrapper containerStyle={styles.container}>
            <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>{t("educationIsFree")}</Text>
                <Text numberOfLines={2} style={styles.textSubTitle}>
                    {t("Learn English Smarter with AI – Your Personal AI Teacher!")}
                </Text>
            </View>
            <Button onPress={handleLoginGoogle} title={t("signInWithGoogle")} containerStyle={styles.btnLoginGoogle} />
            <Button onPress={handleSignOut} title={t("signInWithGoogle")} containerStyle={styles.btnLoginGoogle} />
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={linearGradient} style={styles.circle} />
        </Wrapper>
    )
}

export default SignIn
