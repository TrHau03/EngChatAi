import React, { useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { makeStyles, useTheme } from "@rneui/themed";
import { fontSize, spacing } from "@/core/theme";
import { device, logger } from "@/core/utils";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import SettingItem from "@/core/components/SettingItem";
import { appActions } from "@/redux/reducers/App/appSlice";
import { useTranslation } from "react-i18next"
import { Mode } from "@/core/const/mode";
import { Lang } from "@/core/const/lang";


const SettingsDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const styles = useStyles();
    const { screenType } = route.params as { screenType: string };
    const { theme: { colors } } = useTheme();
    const { t, i18n } = useTranslation();
    let title = screenType;
    let options: any[] = [];

    const dispatch = useAppDispatch()
    const mode = useAppSelector((state) => state.root.app.mode)
    const language = useAppSelector((state) => state.root.app.language)
    const speed = useAppSelector((state) => state.root.app.speed)

    switch (screenType) {
        case "CustomizeChatUI":
            title = "customizechatUI";
            options = [
                { title: "Dark Mode", value: Mode.dark },
                { title: "Light Mode", value: Mode.light },
                { title: "System Default", value: Mode.system },
            ];
            break;
        case "Speed":
            title = "speed";
            options = [
                { title: "0.25x", value: 0.25 },
                { title: "0.5x", value: 0.5 },
                { title: "0.75x", value: 0.75 },
                { title: "1x", value: 1.0 },
                { title: "1.25x", value: 1.25 },
                { title: "1.5x", value: 1.5 },
                { title: "1.75x", value: 1.75 },
                { title: "2x", value: 2.0 },
            ];
            break;
        case "Language":
            title = "language";
            options = [
                { title: "VI", value: Lang.vi },
                { title: "EN", value: Lang.en },
            ];
            break;
    }
    const handleSelected = useCallback((value: string | number) => {
        const keyMap = {
            CustomizeChatUI: "mode",
            Speed: "speed",
            Language: "language",
        } as const;
    
        if (screenType in keyMap) {
            const key = keyMap[screenType as keyof typeof keyMap];
    
            dispatch(appActions.updateState({ [key]: value }));
        }
    }, [screenType, dispatch, i18n]);
    

    const renderItem = useCallback(({ item }: any) => {
        const isSelected =
            screenType === "CustomizeChatUI" ? mode === item.value :
                screenType === "Language" ? language === item.value :
                    screenType === "Speed" ? parseFloat(item.value) === speed :
                        false;

        return (
            <SettingItem
                title={t(item.title)}
                isSelected={isSelected}
                onPress={() => handleSelected(item.value)}
            />
        );
    }, [screenType, mode, language, speed, t, handleSelected]);

    const keyExtractor = useCallback((item: any) => item.value, [])


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="chevron-left" size={26} color={colors.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t(title)}</Text>
            </View>

            <FlatList
                data={options}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
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
