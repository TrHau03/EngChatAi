import { SignIn } from "@/screens/Auth"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import RootTab from "./bottom/RootTab"

const Stack = createNativeStackNavigator<RootStackParamList>()

export enum RootStackParamEnum {
    Auth = "Auth",
    Tab = "Tab",
}

export type RootStackParamList = {
    [RootStackParamEnum.Auth]: undefined
    [RootStackParamEnum.Tab]: undefined
}

export const screens = [
    {
        name: RootStackParamEnum.Auth,
        component: SignIn,
        option: {},
    },
    {
        name: RootStackParamEnum.Tab,
        component: RootTab,
        option: {},
    },
]

export const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName={RootStackParamEnum.Auth}>
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
