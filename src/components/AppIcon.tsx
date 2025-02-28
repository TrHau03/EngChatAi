import { Icon } from "@rneui/themed"
import React from "react"
import { ColorValue, StyleProp, ViewStyle } from "react-native"

interface AppIconProps {
    name: string
    type:
        | "ionicon"
        | "antdesign"
        | "entypo"
        | "feather"
        | "evilicon"
        | "font-awesome"
        | "font-awesome-5"
        | "material"
        | "material-community"
    isPaddingIcon?: boolean
    containerStyles?: StyleProp<ViewStyle>
    color?: number | ColorValue | undefined
}

const AppIcon: React.FC<AppIconProps> = ({ name, type, isPaddingIcon = true, containerStyles, color }) => {
    return (
        <Icon
            name={name}
            type={type}
            color={color}
            containerStyle={[containerStyles, { padding: isPaddingIcon ? 8 : 0 }]}
        />
    )
}

export default AppIcon
