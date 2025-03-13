import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontSize, spacing } from '../theme';
import { makeStyles, useTheme } from '@rneui/themed';
import AppIcon from './AppIcon';
import { useTranslation } from 'react-i18next';

interface SettingItemProps {
    title: string,
    isSelected: boolean,
    onPress?: (name: string) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, isSelected, onPress }) => {
    const styles = useStyles();
    const { theme: { colors } } = useTheme();
    const { t } = useTranslation();

    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            console.log("Item Pressed:", title);
            if (onPress) onPress(title);
        }}>
            <Text style={styles.name}>{t(title)}</Text>
            {isSelected && (
                <AppIcon
                    name="checkmark"
                    type="ionicon"
                    isPaddingIcon={false}
                    color={colors.black}
                    size={spacing.large}
                />
            )}
        </TouchableOpacity>
    );
};


export default SettingItem

const useStyles = makeStyles(({ colors }) => ({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.large,
        borderBottomWidth: 1,
    },
    name: {
        fontSize: fontSize.medium,
        color: colors.black
    }
}));
