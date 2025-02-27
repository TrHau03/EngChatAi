import { RootStack } from "@/navigations"
import { theme } from "@/theme/index"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@rneui/themed"
import i18n from "i18next"
import React from "react"
import { initReactI18next } from "react-i18next"
import Reactotron from "reactotron-react-native"

Reactotron.configure({}).useReactNative().connect()

GoogleSignin.configure({
    iosClientId: process.env.IOS_CLIENT,
})

i18n.use(initReactI18next).init(() => {
    return {
        resources: {
            en: {
                translation: require("@/assets/languages/en.json"),
            },
        },
        lng: "en",
        fallbackLng: "en",
        compatibilityJSON: "v3",
        interpolation: {
            escapeValue: false,
        },
    }
})
function App(): React.JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </ThemeProvider>
    )
}
export default App
