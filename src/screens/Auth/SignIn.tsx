import { Wrapper } from "@/core/components"
import { googleAuthentication } from "@/core/func"
import { fontSize, fontWeight, linearGradientSignIn, padding, spacing } from "@/core/theme"
import { device, logger } from "@/core/utils"
import { TabNavigationProp } from "@/navigation/bottom/RootTab"
import { RootStackParamEnum } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { Button, Image, makeStyles, normalize, Text } from "@rneui/themed"
import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"

const SignIn = () => {
    const styles = useStyles(0)
    const { t } = useTranslation()
    const navigation = useNavigation<TabNavigationProp>()

    const handleLoginGoogle = useCallback(async () => {
        const result = await googleAuthentication()
        logger.object(result)
        if (result) {
            navigation.reset({
                index: 0,
                routes: [{ name: RootStackParamEnum.Tab }],
            })
        }
    }, [])

    return (
        <Wrapper containerStyle={styles.container}>
            <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>{t("educationIsFree")}</Text>
                <Text numberOfLines={2} style={styles.textSubTitle}>
                    {t("learnEnglishSmarter")}
                </Text>
            </View>
            <Button onPress={handleLoginGoogle} title={t("signInWithGoogle")} containerStyle={styles.btnLoginGoogle} />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={linearGradientSignIn}
                style={styles.circle}
            />
        </Wrapper>
    )
}

export default SignIn

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            alignItems: "center",
            paddingHorizontal: padding.medium,
        },
        logo: {
            width: normalize(280),
            height: normalize(280),
        },
        containerTitle: {
            flex: 2,
            maxWidth: "80%",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: spacing.base,
        },
        textTitle: {
            fontSize: fontSize.xxxl,
            color: colors.black,
            fontWeight: fontWeight.bold as any,
        },
        textSubTitle: {
            textAlign: "center",
            fontSize: fontSize.medium,
            color: colors.black,
        },
        circle: {
            width: device().width * 2,
            aspectRatio: 1,
            borderRadius: device().width,
            backgroundColor: "transparent",
            position: "absolute",
            bottom: -device().height / 1.8,
        },
        btnLoginGoogle: {
            flex: 1,
            zIndex: 1,
        },
    }
})
