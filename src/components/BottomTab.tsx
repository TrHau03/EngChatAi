import { Text, useTheme } from "@rneui/themed"
import { Pressable, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function BottomTab({ state, descriptors, navigation }: any) {
    const {
        theme: { colors },
    } = useTheme()
    const insets = useSafeAreaInsets()

    return (
        <View style={{ flexDirection: "row", paddingBottom: insets.bottom }}>
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
                        style={{ flex: 1 }}
                    >
                        <Text style={{ color: isFocused ? colors.primary : colors.secondary }}>{label}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}
