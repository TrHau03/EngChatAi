import { Mode } from "@/core/const/mode"
import { useAppSelector, useInitialTTS } from "@/core/hooks"
import { getTheme } from "@/core/theme/index"
import { envApp } from "@/core/utils/envConfigs"
import { Chat } from "@/db/Chat"
import { NewChat } from "@/db/NewChat"
import { RootStack } from "@/navigation/stack/RootStack"
import { persistor, store } from "@/redux/store"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { NavigationContainer } from "@react-navigation/native"
import { RealmProvider } from "@realm/react"
import { ThemeProvider } from "@rneui/themed"
import i18n from "i18next"
import React from "react"
import { initReactI18next } from "react-i18next"
import { Appearance } from "react-native"
import { Provider } from "react-redux"
import Reactotron from "reactotron-react-native"
import { PersistGate } from "redux-persist/integration/react"

const firebaseConfig = {
    authDomain: "engchatai-8d022.firebaseapp.com",
    projectId: "engchatai-8d022",
    storageBucket: "engchatai-8d022.firebasestorage.app",
    messagingSenderId: "797630589124",
}

// const app = initializeApp({
//     apiKey: envApp.API_KEY,
//     appId: envApp.APP_ID,
//     ...firebaseConfig,
// })
// initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// })

Reactotron.configure({}).useReactNative().connect()

GoogleSignin.configure({
    iosClientId: envApp.IOS_CLIENT,
    webClientId: envApp.ANDROID_CLIENT,
})

i18n.createInstance()
    .use(initReactI18next)
    .init({
        lng: "en",
        resources: {
            en: {
                translation: require("./src/assets/languages/en.json"),
            },
            vi: {
                translation: require("@/assets/languages/vi.json"),
            },
        },
        fallbackLng: "en",
        compatibilityJSON: "v4",
        interpolation: {
            escapeValue: false,
        },
    })
global.Buffer = require("buffer").Buffer
function App(): React.JSX.Element {
    return (
        <RealmProvider schema={[NewChat, Chat]}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <RootNavigation />
                </PersistGate>
            </Provider>
        </RealmProvider>
    )
}

const RootNavigation = () => {
    const mode = useAppSelector((state) => state.root.app.mode)
    useInitialTTS()
    const systemMode = Appearance.getColorScheme()
    return (
        <ThemeProvider theme={getTheme({ mode: mode === Mode.system ? systemMode : mode })}>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default App
