import { NewChat } from "@/screens"
import { SignIn } from "@/screens/Auth"
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import { useTheme } from "@rneui/themed"
import React from "react"
import RootTab from "../bottom/RootTab"

export type ChatProps = NativeStackNavigationProp<RootStackParamList, RootStackParamEnum.Chat>

export type NewChatProps = NativeStackNavigationProp<RootStackParamList, RootStackParamEnum.NewChat>
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
}

export type RootStackParamList = {
    [RootStackParamEnum.Auth]: undefined
    [RootStackParamEnum.Tab]: undefined
    [RootStackParamEnum.NewChat]: undefined
    [RootStackParamEnum.Chat]: undefined
    [RootStackParamEnum.Settings]: undefined
    [RootStackParamEnum.SettingsDetailScreen]: { screenType: "CustomizeChatUI" | "Speedvoice" | "Language" }
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
]

export const RootStack = () => {
    const {
        theme: { colors },
    } = useTheme()
    return (
        <Stack.Navigator
            initialRouteName={RootStackParamEnum.Auth}
            screenOptions={{
                headerShown: false,
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
