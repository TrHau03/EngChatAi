import { RootStack } from "@/navigation/stack/RootStack"
import { theme } from "@/theme/index"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@rneui/themed"
import { initializeApp } from "firebase/app"
import i18n from "i18next"
import React from "react"
import { initReactI18next } from "react-i18next"
import Reactotron from "reactotron-react-native"

const firebaseConfig = {
    apiKey: "AIzaSyBlb3F5EA7rQGX7Ko2QkxRtJOKeUyUM6uE",
    authDomain: "engchatai-8d022.firebaseapp.com",
    projectId: "engchatai-8d022",
    storageBucket: "engchatai-8d022.firebasestorage.app",
    messagingSenderId: "797630589124",
    appId: "1:797630589124:web:b0b96e17779bf58617c191",
}

initializeApp(firebaseConfig)

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
