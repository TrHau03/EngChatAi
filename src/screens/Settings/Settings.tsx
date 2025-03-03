import React, { useState, useCallback } from "react";
import { View, Switch, Pressable, Image, PermissionsAndroid, Platform, Alert } from "react-native";
import { Wrapper } from "@/components";
import { logOut } from "@/func";
import { RootStackParamEnum, RootStackParamList, SettingsStackParamEnum } from "@/navigation/stack/RootStack";
import { spacing } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { device } from "@/utils/device";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary } from 'react-native-image-picker';


const requestPermission = async () => {
    if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
};



const Settings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const styles = useStyles();
    const { theme: { colors } } = useTheme();

    const [avatar, setAvatar] = useState<string | null>(null);

    const handleSelectImage = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
            Alert.alert("Permission Denied", "You need to allow access to your photos.");
            return;
        }

        launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.errorMessage) {
                console.log("ImagePicker Error: ", response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setAvatar(response.assets[0].uri || null);
            }
        });
    };

    const handleLogout = useCallback(async () => {
        const result = await logOut();
        if (result) navigation.navigate(RootStackParamEnum.Auth);
    }, []);

    return (
        <Wrapper containerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.avatarContainer} >
                <Pressable onPress={handleSelectImage}>
                    <Image
                        source={avatar ? { uri: avatar } : { uri: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" }}
                        style={styles.avatar}
                    />
                </Pressable>
            </View>

            <Pressable
                style={styles.row}
                onPress={() => navigation.navigate(RootStackParamEnum.SettingsStack, { screen: SettingsStackParamEnum.DarkMode })}
            >
                <View style={styles.rowLeft}>
                    <MaterialIcons name="dark-mode" size={24} color={colors.black} />
                    <Text style={styles.label}>Dark Mode Toggle</Text>
                </View>
                <Icon name="chevron-right" size={24} color={colors.black} />
            </Pressable>

            <Pressable
                style={styles.row}
                onPress={() => navigation.navigate(RootStackParamEnum.SettingsStack, { screen: SettingsStackParamEnum.CustomizeChatUI })}
            >
                <View style={styles.rowLeft}>
                    <MaterialIcons name="chat" size={24} color={colors.black} />
                    <Text style={styles.label}>Customize Chat UI</Text>
                </View>
                <Icon name="chevron-right" size={24} color={colors.black} />
            </Pressable>

            <Pressable style={styles.row} onPress={handleLogout}>
                <View style={styles.rowLeft}>
                    <MaterialIcons name="logout" size={24} color={colors.black} />
                    <Text style={styles.label}>Logout</Text>
                </View>
                <Icon name="chevron-right" size={24} color={colors.black} />
            </Pressable>
        </Wrapper>
    );
};

export default Settings;

const useStyles = makeStyles(({ colors }) => ({
    container: {
        backgroundColor: colors.background,
        paddingHorizontal: spacing.large,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        height: device().height * 0.13,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black,
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: spacing.large,
    },
    avatar: {
        width: 170,
        height: 170,
        borderRadius: 100,
        borderColor: colors.primary,
    },
    avatarEditIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyOutline,
        paddingHorizontal: spacing.base,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        color: colors.black,
        marginLeft: 10,
    },
}));
