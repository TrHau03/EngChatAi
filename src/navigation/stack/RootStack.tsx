import { Message } from "@/core/entities/message"
import { NewChat } from "@/screens"
import { SignIn } from "@/screens/Auth"
import QuestionAndAnswer from "@/screens/Q&A/QuestionAndAnswer"
import SettingsDetailScreen from "@/screens/Settings/SettingsDetailScreen"
import { Words } from "@/screens/Word"
import { useNavigation } from "@react-navigation/native"
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack"
import { useTheme } from "@rneui/themed"
import React from "react"
import { useTranslation } from "react-i18next"
import RootTab from "../bottom/RootTab"

export type ChatProps = NativeStackNavigationProp<RootStackParamList, RootStackParamEnum.Chat>

export type NewChatProps = NativeStackScreenProps<RootStackParamList, RootStackParamEnum.NewChat>

export type DetailSettingsProps = NativeStackScreenProps<RootStackParamList, RootStackParamEnum.SettingsDetailScreen>

export interface ScreenProps {
    name: RootStackParamEnum
    component: React.ComponentType<any>
    option: NativeStackNavigationOptions
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export enum RootStackParamEnum {
    Auth = "Auth",
    Tab = "Tab",
    NewChat = "NewChat",
    Chat = "Chat",
    Settings = "Settings",
    SettingsDetailScreen = "SettingsDetailScreen",
    QuestionAndAnswer = "QuestionAndAnswer",
    Words = "Words",
}

export type RootStackParamList = {
    [RootStackParamEnum.Auth]: undefined
    [RootStackParamEnum.Tab]: undefined
    [RootStackParamEnum.NewChat]: {
        type: "new" | "view"
        messages?: Message[]
    }
    [RootStackParamEnum.Chat]: undefined
    [RootStackParamEnum.Settings]: undefined
    [RootStackParamEnum.SettingsDetailScreen]: { screenType: "CustomizeChatUI" | "Speed" | "Language" }
    [RootStackParamEnum.QuestionAndAnswer]: undefined
    [RootStackParamEnum.Words]: undefined
}
export const screens: ScreenProps[] = [
    {
        name: RootStackParamEnum.Auth,
        component: SignIn,
        option: {
            headerShown: false,
        },
    },
    {
        name: RootStackParamEnum.Tab,
        component: RootTab,
        option: {},
    },
    {
        name: RootStackParamEnum.NewChat,
        component: NewChat,
        option: {
            headerShown: true,
            headerTransparent: true,
            headerBackButtonDisplayMode: "generic",
        },
    },
    {
        name: RootStackParamEnum.SettingsDetailScreen,
        component: SettingsDetailScreen,
        option: {
            headerShown: true,
        },
    },
    {
        name: RootStackParamEnum.QuestionAndAnswer,
        component: QuestionAndAnswer,
        option: {
            headerShown: false,
        },
    },
    {
        name: RootStackParamEnum.Words,
        component: Words,
        option: {
            headerShown: false,
        },
    },
]

export const RootStack = () => {
    const {
        theme: { colors },
    } = useTheme()
    const { t } = useTranslation()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    // useEffect(() => {
    //     auth.getAuth().onAuthStateChanged((user) => {
    //         if (user) {
    //             navigation.navigate(RootStackParamEnum.Tab)
    //         } else {
    //             navigation.navigate(RootStackParamEnum.Auth)
    //         }
    //     })
    // }, [auth, navigation])

    return (
        <Stack.Navigator
            initialRouteName={RootStackParamEnum.Auth}
            screenOptions={{
                headerShown: false,
                headerBackTitle: t("back"),
            }}
        >
            {screens.map((screen) => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{
                        ...screen.option,
                        headerStyle: { backgroundColor: colors.background },
                        headerTitleStyle: { color: colors.black },
                    }}
                />
            ))}
        </Stack.Navigator>
    )
}
