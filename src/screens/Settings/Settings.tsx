import React, { useState, useCallback } from "react";
import { View, Switch, Modal, TouchableOpacity } from "react-native";
import { Wrapper } from "@/components";
import { logOut } from "@/func";
import { SettingsScreenNavigationProp } from "@/navigation/bottom/RootTab";
import { RootStackParamEnum } from "@/navigation/stack/RootStack";
import { spacing } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { Button, makeStyles, Text, useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";

const Settings = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const styles = useStyles();
    const { theme: { colors } } = useTheme();
    
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleLogout = useCallback(async () => {
        const result = await logOut();
        if (result) navigation.navigate(RootStackParamEnum.Auth);
    }, []);

    const openModal = (type : any) => {
        setModalType(type);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalType("");
    };

    return (
        <Wrapper containerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {modalVisible && (
                    <TouchableOpacity onPress={closeModal}>
                        <Icon name="arrow-back" size={24} color={colors.black} />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>Settings</Text>
            </View>

            {/* Dark Mode / Notifications */}
            <View style={styles.row}>
                <Text style={styles.label}>Dark Mode</Text>
                <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Enable Notifications</Text>
                <Switch value={notifications} onValueChange={setNotifications} />
            </View>
            
            {/* Modal Options */}
            <Button title="Customize Chat UI" onPress={() => openModal("chat_ui")} />
            <Button title="Report an Issue" onPress={() => openModal("report_issue")} />
            <Button title="Feedback & Review" onPress={() => openModal("feedback")} />
            <Button title="Logout" onPress={handleLogout} />

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
                <Wrapper containerStyle={styles.modalContainer}>
                    <TouchableOpacity onPress={closeModal}>
                        <Icon name="arrow-back" size={24} color={colors.black} />
                    </TouchableOpacity>
                    {modalType === "chat_ui" && <Text>Customize Chat UI</Text>}
                    {modalType === "report_issue" && <Text>Report an Issue</Text>}
                    {modalType === "feedback" && <Text>Feedback & Review</Text>}
                </Wrapper>
            </Modal>
        </Wrapper>
    );
};

export default Settings;

const useStyles = makeStyles(({ colors }) => ({
    container: {
        backgroundColor: colors.background,
        paddingHorizontal: spacing.base,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.large,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.medium,
    },
    label: {
        fontSize: 16,
        color: colors.black,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },
}));
