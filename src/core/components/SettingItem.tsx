import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontSize, spacing } from '../theme';
import { makeStyles, useTheme } from '@rneui/themed';
import AppIcon from './AppIcon';

interface SettingItemProps {
    name: string,
    isSelected: boolean,
    onPress?: (name: string) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ name, isSelected, onPress }) => {
    const styles = useStyles();
    const { theme: { colors } } = useTheme();

    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            console.log("Item Pressed:", name);
            if (onPress) onPress(name);
        }}>
            <Text style={styles.name}>{name}</Text>
            {isSelected && (
                <AppIcon
                    name="checkmark"
                    type="ionicon"
                    color={colors.black}
                    isPaddingIcon
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
