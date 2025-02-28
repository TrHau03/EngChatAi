import { Wrapper } from "@/components"
import { googleAuthentication, signOut } from "@/func/googleAuth"
import { logger } from "@/utils"
import { Button, Image, Text } from "@rneui/themed"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { useStyles } from "./styles"

const SignIn = () => {
    const styles = useStyles(0)
    const { t } = useTranslation()

    const handleLoginGoogle = useCallback(async () => {
        const credential = await googleAuthentication()
        logger.info("credential", credential)
    }, [])

    const handleSignOut = useCallback(async () => {
        await signOut()
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
            <View style={styles.circle} />
        </Wrapper>
    )
}

export default SignIn
