import { Dimensions } from "react-native"

export const device = () => {
    return {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    }
}
