import { linearGradient } from "@/theme"
import { makeStyles, Text, useTheme } from "@rneui/themed"
import { Pressable, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AppIcon from "./AppIcon"

export function BottomTab({ state, descriptors, navigation }: any) {
    const {
        theme: { colors },
    } = useTheme()
    const insets = useSafeAreaInsets()
    const styles = useStyles()

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={linearGradient}>
            <View style={[styles.container, { paddingBottom: insets.bottom, paddingTop: insets.bottom / 2 }]}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key]
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name

                    const isFocused = state.index === index

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params)
                        }
                    }

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        })
                    }

                    return (
                        <Pressable
                            key={index}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.btnTab}
                        >
                            <AppIcon
                                name="home"
                                type="ionicon"
                                isPaddingIcon={false}
                                color={isFocused ? colors.primary : colors.grey5}
                            />
                            <Text style={{ color: isFocused ? colors.primary : colors.grey5 }}>{label}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </LinearGradient>
    )
}

const useStyles = makeStyles(({ colors, mode }) => {
    return {
        container: {
            flexDirection: "row",
        },
        btnTab: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    }
})
