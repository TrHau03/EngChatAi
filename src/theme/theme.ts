import { createTheme } from "@rneui/themed"
import { darkColors, lightColors } from "./colors"
import { fontSize } from "./font"

export const theme = createTheme({
    lightColors: lightColors,
    darkColors: darkColors,
    mode: "dark",
    components: {
        Text: (props, theme) => {
            return {
                style: {
                    color: theme.colors.black,
                    fontSize: fontSize.medium,
                },
            }
        },
    },
})
