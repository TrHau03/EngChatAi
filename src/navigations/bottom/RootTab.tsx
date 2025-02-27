import { Chat, Home } from "@/screens/index"
import { Settings } from "@/screens/Settings"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import React from "react"

const Tab = createMaterialTopTabNavigator<RootTabParamsList>()

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

const RootTab = () => {
    return (
        <Tab.Navigator initialRouteName={RootTabParamsEnum.Home} tabBarPosition="bottom">
            {screens.map((screen) => (
                <Tab.Screen key={screen.name} name={screen.name} component={screen.component} options={screen.option} />
            ))}
        </Tab.Navigator>
    )
}

export default RootTab
