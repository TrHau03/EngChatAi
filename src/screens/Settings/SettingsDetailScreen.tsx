import { Wrapper } from "@/core/components"
import SettingItem from "@/core/components/SettingItem"
import { useSettings } from "@/core/hooks/useSettting"
import { fontSize, spacing } from "@/core/theme"
import { device } from "@/core/utils"
import { DetailSettingsProps } from "@/navigation/stack/RootStack"
import { makeStyles } from "@rneui/themed"
import React, { useCallback, useEffect } from "react"
import { FlatList } from "react-native"

const SettingsDetailScreen =  (props: DetailSettingsProps) => {
    const styles = useStyles()
    const { title, options, handleSelected, isSelected } = useSettings(props.route.params?.screenType)

    useEffect(() => {
        props.navigation.setOptions({ title })
    }, [props.navigation, title])

    const keyExtractor = useCallback((item: any) => item.value.toString(), [])

    const renderItem = useCallback(
        ({ item }: any) => (
            <SettingItem title={item.title} isSelected={isSelected(item.value)} onPress={() => handleSelected(item.value)} />
        ),
        [isSelected, handleSelected],
    )
    return (
        <Wrapper isSafeArea edges={["bottom"]} containerStyle={styles.container}>
            <FlatList
                data={options}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </Wrapper>
    )
}

const useStyles = makeStyles(({ colors }) => ({
    container: {
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.large,
        margin: spacing.large,
        height: device().height * 0.1,
    },
    backButton: {
        position: "absolute",
        top: device().height * 0.05,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: fontSize.large,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
        color: colors.black,
        top: device().height * 0.013,
    },
    optionList: {
        width: "100%",
        paddingHorizontal: spacing.large,
        marginTop: spacing.medium,
    },
    listContent: {
        paddingBottom: spacing.large,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.large,
        borderRadius: spacing.small,
        marginVertical: spacing.small,
        backgroundColor: colors.grey5,
    },
    selectedItem: {
        backgroundColor: colors.black,
    },
    itemText: {
        fontSize: fontSize.medium,
        fontWeight: "500",
        color: colors.black,
    },
    selectedItemText: {
        color: colors.primary,
    },
    checkIcon: {
        color: colors.primary,
    },
}))

export default SettingsDetailScreen
