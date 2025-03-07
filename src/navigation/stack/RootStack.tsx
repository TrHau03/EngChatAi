import { NewChat, Settings } from "@/screens";
import { SignIn } from "@/screens/Auth";
import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import RootTab from "../bottom/RootTab";
import SettingsDetailScreen from "@/screens/Settings/SettingsDetailScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ChatProps = NativeStackNavigationProp<RootStackParamList, RootStackParamEnum.Chat>;

export type NewChatProps = NativeStackNavigationProp<RootStackParamList, RootStackParamEnum.NewChat>;


const Stack = createNativeStackNavigator<RootStackParamList>();

export enum RootStackParamEnum {
    Auth = "Auth",
    Tab = "Tab",
    NewChat = "NewChat",
    Chat = "Chat",
    Settings = "Settings",
    SettingsDetailScreen="SettingsDetailScreen",
}

export type RootStackParamList = {
    [RootStackParamEnum.Auth]: undefined;
    [RootStackParamEnum.Tab]: undefined;
    [RootStackParamEnum.NewChat]: undefined;
    [RootStackParamEnum.Chat]: undefined
    [RootStackParamEnum.Settings]: undefined;
    [RootStackParamEnum.SettingsDetailScreen]: { screenType: "CustomizeChatUI" | "Speedvoice" | "Language" };

};


export const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName={RootStackParamEnum.Auth} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={RootStackParamEnum.Auth} component={SignIn} />
            <Stack.Screen name={RootStackParamEnum.Tab} component={RootTab} />
            <Stack.Screen name={RootStackParamEnum.NewChat} component={NewChat} />
            <Stack.Screen name={RootStackParamEnum.Settings} component={Settings} />
            <Stack.Screen name={RootStackParamEnum.SettingsDetailScreen} component={SettingsDetailScreen} />
        </Stack.Navigator>
    );
};