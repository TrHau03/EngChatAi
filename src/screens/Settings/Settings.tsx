import { AppIcon, Wrapper } from "@/core/components"
import { fontSize, iconSize, spacing } from "@/core/theme"
import { device } from "@/core/utils"
import { makeStyles, Text } from "@rneui/themed"
import React, { } from "react"
import { Image, Pressable, View } from "react-native"
import { useSettings } from "./hooks/useSettting"
import { useAppSelector } from "@/core/hooks"


const Settings = () => {

    const { colors, t, handleSelectImage, handleNavigate, handleLogout } = useSettings()
    const styles = useStyles()
    const avatar = useAppSelector((state) => state.root.app.avatar)

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t("settings")}</Text>
            </View>

            <View style={styles.avatarContainer}>
                <Pressable onPress={handleSelectImage} style={styles.avatarWrapper}>
                    <Image
                        source={
                            avatar
                                ? { uri: avatar }
                                : {
                                    uri: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
                                }
                        }
                        style={styles.avatar}
                    />
                </Pressable>
            </View>

            <Pressable style={styles.row} onPress={() => handleNavigate("CustomizeChatUI")}>
                <View style={styles.rowLeft}>
                    <AppIcon name="chat" size={iconSize.medium} color={colors.black} type={"material"} />
                    <Text style={styles.label}>{t("customizechatui")}</Text>
                </View>
                <AppIcon name="chevron-right" size={24} color={colors.black} type={"feather"} />
            </Pressable>

            <Pressable style={styles.row} onPress={() => handleNavigate("Speed")}>
                <View style={styles.rowLeft}>
                    <AppIcon name="speed" size={iconSize.medium} color={colors.black} type={"material"} />
                    <Text style={styles.label}>{t("speed")}</Text>
                </View>
                <AppIcon name="chevron-right" size={24} color={colors.black} type={"feather"} />
            </Pressable>

            <Pressable style={styles.row} onPress={() => handleNavigate("Language")}>
                <View style={styles.rowLeft}>
                    <AppIcon name="language" size={iconSize.medium} color={colors.black} type={"material"} />
                    <Text style={styles.label}>{t("language")}</Text>
                </View>
                <AppIcon name="chevron-right" size={24} color={colors.black} type={"feather"} />
            </Pressable>

            <Pressable style={styles.row} onPress={handleLogout}>
                <View style={styles.rowLeft}>
                    <AppIcon name="logout" size={iconSize.medium} color={colors.black} type={"material"} />
                    <Text style={styles.label}>{t("logout")}</Text>
                </View>
                <AppIcon name="chevron-right" size={24} color={colors.black} type={"feather"} />
            </Pressable>
        </Wrapper>
    )
}

export default Settings

const useStyles = makeStyles(({ colors }) => ({

    container: {
        backgroundColor: colors.background,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        height: device().height * 0.05,
    },
    title: {
        fontSize: fontSize.xl,
        fontWeight: "bold",
        color: colors.black,
    },
    avatarContainer: {
        alignItems: "center",
    },
    avatarWrapper: {
        position: "relative",
        padding: 30,
    },
    avatar: {
        width: 170,
        height: 170,
        borderRadius: 85,
    },
    avatarEditIcon: {
        position: "absolute",
        bottom: 10,
        right: 10,
        borderRadius: 12,
        padding: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyOutline,
        paddingHorizontal: spacing.base,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: fontSize.medium,
        color: colors.black,
        marginLeft: 10,
    },
}))
