import { BottomTab } from "@/components/BottomTab"
import { Chat, Home } from "@/screens/index"
import { Settings } from "@/screens/Settings"
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { RootStackParamList } from "../stack/RootStack"

const Tab = createBottomTabNavigator<RootTabParamsList>()

enum RootTabParamsEnum {
    Home = "Home",
    Chat = "Chat",
    Settings = "Settings",
}
type RootTabParamsList = {
    [RootTabParamsEnum.Home]: undefined
    [RootTabParamsEnum.Chat]: undefined
    [RootTabParamsEnum.Settings]: undefined
}
const screens = [
    {
        name: RootTabParamsEnum.Home,
        component: Home,
        option: {},
    },
    {
        name: RootTabParamsEnum.Chat,
        component: Chat,
        option: {},
    },
    {
        name: RootTabParamsEnum.Settings,
        component: Settings,
        option: {},
    },
]

export type TabNavigationProp = NativeStackNavigationProp<RootStackParamList>
export type HomesScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamsList, RootTabParamsEnum.Home>,
    NativeStackNavigationProp<RootStackParamList>
>
export type ChatScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamsList, RootTabParamsEnum.Chat>,
    NativeStackNavigationProp<RootStackParamList>
>
export type SettingsScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamsList, RootTabParamsEnum.Settings>,
    NativeStackNavigationProp<RootStackParamList>
>

const RootTab = () => {
    return (
        <Tab.Navigator
            initialRouteName={RootTabParamsEnum.Home}
            backBehavior="none"
            tabBar={(props) => <BottomTab {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            {screens.map((screen) => (
                <Tab.Screen key={screen.name} name={screen.name} component={screen.component} options={screen.option} />
            ))}
        </Tab.Navigator>
    )
}

export default RootTab
