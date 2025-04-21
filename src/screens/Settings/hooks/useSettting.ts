import { logOut } from "@/core/func"
import { RootStackParamEnum, RootStackParamList } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTheme } from "@rneui/themed"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, PermissionsAndroid, Platform } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { Lang } from "@/core/const/lang"
import { Mode } from "@/core/const/mode"
import { useAppDispatch, useAppSelector } from "@/core/hooks"
import { appActions } from "@/redux/reducers/App/appSlice"

type ScreenType = "CustomizeChatUI" | "Speed" | "Language";

export const useSettings = (screenType?: ScreenType) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { theme: { colors } } = useTheme()
    let options: any[] = []
    const mode = useAppSelector((state) => state.root.app.mode)
    const language = useAppSelector((state) => state.root.app.language)
    const speed = useAppSelector((state) => state.root.app.speed)

    const handleNavigate = (screenType?: "CustomizeChatUI" | "Speed" | "Language") => {
        if (!screenType) return
        navigation.navigate(RootStackParamEnum.SettingsDetailScreen, { screenType })
    }

    const title = useMemo(() => (screenType ? t(screenType.toLowerCase()) : ""), [t, screenType])

    const handleLogout = useCallback(async () => {
        const result = await logOut()
        if (result) navigation.navigate(RootStackParamEnum.Auth)
    }, [navigation])

    const requestPermission = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES)
            return granted === PermissionsAndroid.RESULTS.GRANTED
        }
        return true
    }

    const handleSelectImage = async () => {
        if (!(await requestPermission())) {
            Alert.alert("Permission Denied", "You need to allow access to your photos.");
            return;
        }
        const response = await launchImageLibrary({ mediaType: "photo", quality: 1 });
        if (response.assets?.[0]?.uri) dispatch(appActions.updateState({ avatar: response.assets[0].uri }));
    };

    if (screenType) {
        switch (screenType) {
            case "CustomizeChatUI":
                options = [
                    { title: "Dark Mode", value: Mode.dark },
                    { title: "Light Mode", value: Mode.light },
                    { title: "System Default", value: Mode.system },
                ]
                break
            case "Speed":
                options = [
                    { title: "0.25x", value: 0.25 },
                    { title: "0.5x", value: 0.5 },
                    { title: "0.75x", value: 0.75 },
                    { title: "1x", value: 1.0 },
                    { title: "1.25x", value: 1.25 },
                    { title: "1.5x", value: 1.5 },
                    { title: "1.75x", value: 1.75 },
                    { title: "2x", value: 2.0 },
                ]
                break
            case "Language":
                options = [
                    { title: "VI", value: Lang.vi },
                    { title: "EN", value: Lang.en },
                ]
                break
        }
    }

    const handleSelected = useCallback(
        (value: string | number) => {
            const keyMap = {
                CustomizeChatUI: "mode",
                Speed: "speed",
                Language: "language",
            } as const

            if (screenType && keyMap[screenType]) {
                dispatch(appActions.updateState({ [keyMap[screenType]]: value }))
            }
        },
        [screenType, dispatch]
    )

    const isSelected = (value: string | number) => {
        if (!screenType) return false
        const stateMap = {
            CustomizeChatUI: mode,
            Language: language,
            Speed: speed,
        }
        return screenType === "Speed" ? parseFloat(value as string) === stateMap[screenType] : stateMap[screenType] === value
    }

    return {
        colors,
        t,
        handleSelectImage,
        handleNavigate,
        handleLogout,
        title,
        options,
        handleSelected,
        isSelected,
    }
}
