import SettingItem from "@/core/components/SettingItem"
import { Mode } from "@/core/const/mode"
import { useAppDispatch, useAppSelector } from "@/core/hooks"
import { fontSize, spacing } from "@/core/theme"
import { device } from "@/core/utils"
import { appActions } from "@/redux/reducers/App/appSlice"
import Slider from "@react-native-community/slider"
import { useNavigation, useRoute } from "@react-navigation/native"
import { makeStyles, useTheme } from "@rneui/themed"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"

const SettingsDetailScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { screenType } = route.params as { screenType: string }
    const {
        theme: { colors },
    } = useTheme()
    const styles = useStyles()

    const dispatch = useAppDispatch()
    const mode = useAppSelector((state) => state.root.app.mode)
    const language = useAppSelector((state) => state.root.app.language)
    const speed = useAppSelector((state) => state.root.app.speed)

    const { t, i18n } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    let title = t("settings")
    let options: any[] = []
    let isSlider = false

    switch (screenType) {
        case "CustomizeChatUI":
            title = t("CustomizeChatUI")
            options = [
                {
                    title: Mode.dark,
                    value: Mode.dark,
                },
                {
                    title: Mode.light,
                    value: Mode.light,
                },
                {
                    title: Mode.system,
                    value: Mode.system,
                },
            ]
            break
        case "Speedvoice":
            title = t("Speedvoice")
            isSlider = true
            options = [
                {
                    title: "0.25x",
                    value: 0.25,
                },
                {
                    title: "0.5x",
                    value: 0.5,
                },
                {
                    title: "1x",
                    value: 1,
                },
                {
                    title: "1.5x",
                    value: 1.5,
                },
                {
                    title: "2x",
                    value: 2,
                },
            ]
            break
        case "Language":
            title = t("Language")
            options = [
                {
                    title: "English",
                    value: "en",
                },
                {
                    title: "Spanish",
                    value: "es",
                },
            ]
            break
    }

    const handleSelected = (item: string) => {
        console.log("Selected Item:", item)

        switch (screenType) {
            case "CustomizeChatUI":
                dispatch(appActions.updateState({ mode: item.toLowerCase() }))
                break
            case "Speedvoice":
                dispatch(appActions.updateState({ speed: parseFloat(item) }))
                break
            case "Language":
                dispatch(appActions.updateState({ language: item.toLowerCase() }))
                i18n.changeLanguage(item)
                break
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="chevron-left" size={26} color={colors.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {isSlider ? (
                <View style={styles.sliderContainer}>
                    <Text style={styles.sliderText}>
                        {t("Speed")}: {speed.toFixed(2)}x
                    </Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0.25}
                        maximumValue={2}
                        step={0.05}
                        value={speed}
                        onSlidingComplete={(value) => dispatch(appActions.updateState({ speed: value }))}
                        minimumTrackTintColor={colors.primary}
                        maximumTrackTintColor={colors.grey3}
                        thumbTintColor={colors.primary}
                    />
                    <View style={styles.optionList}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                const isSelected = parseFloat(item) === speed
                                return (
                                    <TouchableOpacity
                                        style={[styles.item, isSelected && styles.selectedItem]}
                                        onPress={() => handleSelected(item.value)}
                                    >
                                        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
                                            {item}
                                        </Text>
                                        {isSelected && <Icon name="check" size={20} style={styles.checkIcon} />}
                                    </TouchableOpacity>
                                )
                            }}
                            contentContainerStyle={styles.listContent}
                        />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={options}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        const isSelected =
                            screenType === "CustomizeChatUI"
                                ? mode.toLowerCase() === item.toLowerCase()
                                : screenType === "Language"
                                ? language.toLowerCase() === item.toLowerCase()
                                : false
                        return <SettingItem name={item} isSelected={isSelected} onPress={() => handleSelected(item)} />
                    }}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    )
}

const useStyles = makeStyles(({ colors }) => ({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.large,
        margin: spacing.large,
        height: device().height * 0.1,
    },
    backButton: {
        position: "absolute",
        top: device().height * 0.05,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: fontSize.large,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
        color: colors.black,
        top: device().height * 0.013,
    },
    sliderContainer: {
        alignItems: "center",
        marginVertical: spacing.large,
    },
    sliderText: {
        fontSize: fontSize.medium,
        marginBottom: spacing.medium,
        color: colors.black,
    },
    slider: {
        width: "90%",
    },
    optionList: {
        width: "100%",
        paddingHorizontal: spacing.large,
        marginTop: spacing.medium,
    },
    listContent: {
        paddingBottom: spacing.large,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.large,
        borderRadius: spacing.small,
        marginVertical: spacing.small,
        backgroundColor: colors.grey5,
    },
    selectedItem: {
        backgroundColor: colors.black,
    },
    itemText: {
        fontSize: fontSize.medium,
        fontWeight: "500",
        color: colors.black,
    },
    selectedItemText: {
        color: colors.primary,
    },
    checkIcon: {
        color: colors.primary,
    },
}))

export default SettingsDetailScreen
