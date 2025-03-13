import { Message } from "@/core/entities/message"
import { NewChat } from "@/screens"
import { SignIn } from "@/screens/Auth"
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack"
import { useTheme } from "@rneui/themed"
import React from "react"
import { List } from "realm"
import RootTab from "../bottom/RootTab"
import SettingsDetailScreen from "@/screens/Settings/SettingsDetailScreen"

export type ChatProps = NativeStackNavigationProp<RootStackParamList, RootStackParamEnum.Chat>

export type NewChatProps = NativeStackScreenProps<RootStackParamList, RootStackParamEnum.NewChat>

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
    [RootStackParamEnum.NewChat]: {
        type: "new" | "view"
        messages?: List<Message>
    }
    [RootStackParamEnum.Chat]: undefined
    [RootStackParamEnum.Settings]: undefined
    [RootStackParamEnum.SettingsDetailScreen]: { screenType: "CustomizeChatUI" | "Speed" | "Language" }
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
        option: {},
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
