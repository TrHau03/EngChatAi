import { GoogleSignin } from "@react-native-google-signin/google-signin"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Reactotron from "reactotron-react-native"

export const configApp = () => {
    Reactotron.configure() // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect()

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
}
