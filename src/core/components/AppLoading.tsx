import { normalize, useTheme } from "@rneui/themed"
import LottieView from "lottie-react-native"
import React from "react"
import { View } from "react-native"

interface AppLoadingProps {
    isLoading: boolean
}

const AppLoading: React.FC<AppLoadingProps> = (props) => {
    const {
        theme: { colors },
    } = useTheme()
    if (!props.isLoading) {
        return null
    }
    return (
        <View
            style={{
                flex: 1,
                zIndex: 10,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: `${colors.background}40`,
            }}
        >
            <LottieView
                style={{ width: normalize(48), aspectRatio: 1 }}
                source={require("@/assets/animations/loading.json")}
                autoPlay
                loop
            />
        </View>
    )
}

export default AppLoading
