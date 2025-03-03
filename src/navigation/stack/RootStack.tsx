import { NewChat } from "@/screens";
import { SignIn } from "@/screens/Auth";
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";
import RootTab from "../bottom/RootTab";
import CustomizeChatUI from "@/screens/Settings/CustomizeChatUI";
import FeedbackReview from "@/screens/Settings/FeedbackReview";
import ReportIssue from "@/screens/Settings/ReportIssue";
import Settings from "@/screens/Settings/Settings";
import DarkMode from "@/screens/Settings/DarkMode";
import { useTheme } from "@rneui/themed";

const Stack = createNativeStackNavigator<RootStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export enum RootStackParamEnum {
    Auth = "Auth",
    Tab = "Tab",
    NewChat = "NewChat",
    SettingsStack = "SettingsStack",
}

export enum SettingsStackParamEnum {
    Settings = "Settings",
    DarkMode = "DarkMode",
    CustomizeChatUI = "CustomizeChatUI",
    ReportIssue = "ReportIssue",
    FeedbackReview = "FeedbackReview",
}

export type RootStackParamList = {
    [RootStackParamEnum.Auth]: undefined;
    [RootStackParamEnum.Tab]: undefined;
    [RootStackParamEnum.NewChat]: undefined;
    [RootStackParamEnum.SettingsStack]: { screen: keyof SettingsStackParamList };

};

export type SettingsStackParamList = {
    [SettingsStackParamEnum.DarkMode]: undefined;
    [SettingsStackParamEnum.Settings]: undefined;
    [SettingsStackParamEnum.CustomizeChatUI]: undefined;
    [SettingsStackParamEnum.ReportIssue]: undefined;
    [SettingsStackParamEnum.FeedbackReview]: undefined;
};

export const SettingsNavigator = () => {
    const { theme: { colors } } = useTheme();
    return (
        <SettingsStack.Navigator

            screenOptions={{
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.black,
            }}>

            <SettingsStack.Screen name={SettingsStackParamEnum.DarkMode} component={DarkMode} />
            <SettingsStack.Screen name={SettingsStackParamEnum.Settings} component={Settings} />
            <SettingsStack.Screen name={SettingsStackParamEnum.CustomizeChatUI} component={CustomizeChatUI} />
            <SettingsStack.Screen name={SettingsStackParamEnum.ReportIssue} component={ReportIssue} />
            <SettingsStack.Screen name={SettingsStackParamEnum.FeedbackReview} component={FeedbackReview} />
        </SettingsStack.Navigator>
    );
};

export const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName={RootStackParamEnum.Auth} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={RootStackParamEnum.Auth} component={SignIn} />
            <Stack.Screen name={RootStackParamEnum.Tab} component={RootTab} />
            <Stack.Screen name={RootStackParamEnum.NewChat} component={NewChat} />
            <Stack.Screen name={RootStackParamEnum.SettingsStack} component={SettingsNavigator} />
        </Stack.Navigator>
    );
};
