import { SignIn } from "@/screens/Auth"
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
    NativeStackScreenProps,
} from "@react-navigation/native-stack"
import React from "react"
import RootTab from "../bottom/RootTab"

const Stack = createNativeStackNavigator<RootStackParamList>()

interface ScreenProps {
    name: RootStackParamEnum
    component: React.ComponentType<any>
    option: NativeStackNavigationOptions
}

export enum RootStackParamEnum {
    Auth = "Auth",
    Tab = "Tab",
}

export type RootStackParamList = {
    [RootStackParamEnum.Auth]: undefined
    [RootStackParamEnum.Tab]: undefined
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
]

export type HomeProps = NativeStackScreenProps<RootStackParamList, RootStackParamEnum.Tab>
export type ChatProps = NativeStackScreenProps<RootStackParamList, RootStackParamEnum.Tab>
export type SettingsProps = NativeStackScreenProps<RootStackParamList, RootStackParamEnum.Tab>

export const RootStack = () => {
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
                    options={screen.option}
                />
            ))}
        </Stack.Navigator>
    )
}
