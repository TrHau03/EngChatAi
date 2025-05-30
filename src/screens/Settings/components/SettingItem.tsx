import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { makeStyles, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/core/components';
import { fontSize, spacing } from '@/core/theme';

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
            onPress?.(title);
        }}>
            <Text style={styles.name}>{t(title)}</Text>
            {isSelected && (
                <AppIcon
                    name="checkmark"
                    type="ionicon"
                    isPaddingIcon={false}
                    color={colors.black}
                    size={spacing.xl}
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
        paddingHorizontal: spacing.large,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyOutline,
        paddingVertical: spacing.xl,
    },
    name: {
        fontSize: fontSize.medium,
        color: colors.black
    }
}));
