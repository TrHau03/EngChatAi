import { AppLoading, ErrorBoundary, I18NProvider } from "@/core/components"
import { Mode } from "@/core/const/mode"
import { useAppSelector } from "@/core/hooks"
import { useInitialTTS } from "@/core/hooks/useInitialTTS"
import { getTheme } from "@/core/theme/index"
import { envApp } from "@/core/utils"
import { RootStack } from "@/navigation/stack/RootStack"
import { persistor, store } from "@/redux/store"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@rneui/themed"
import React from "react"
import { Appearance } from "react-native"
import { Provider } from "react-redux"
import Reactotron from "reactotron-react-native"
import { PersistGate } from "redux-persist/integration/react"

// const firebaseConfig = {
//     authDomain: "engchatai-8d022.firebaseapp.com",
//     projectId: "engchatai-8d022",
//     storageBucket: "engchatai-8d022.firebasestorage.app",
// }
// const app = initializeApp({
//     apiKey: "AIzaSyBlb3F5EA7rQGX7Ko2QkxRtJOKeUyUM6uE",
//     appId: "1:797630589124:web:b0b96e17779bf58617c191",
//     ...firebaseConfig,
// })
// initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// })

__DEV__ && Reactotron.configure({}).useReactNative().connect()

GoogleSignin.configure({
    iosClientId: envApp.IOS_CLIENT,
    webClientId: envApp.WEB_CLIENT,
    offlineAccess: true,
})

global.Buffer = require("buffer").Buffer
function App(): React.JSX.Element {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <I18NProvider>
                        <RootNavigation />
                    </I18NProvider>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    )
}

const RootNavigation = () => {
    const mode = useAppSelector((state) => state.root.app.mode)
    useInitialTTS()
    const isLoading = useAppSelector((state) => state.root.app.isLoading)
    const systemMode = Appearance.getColorScheme()

    return (
        <ThemeProvider theme={getTheme({ mode: mode === Mode.system ? systemMode : mode })}>
            <NavigationContainer>
                <RootStack />
                <AppLoading isLoading={isLoading} />
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default App
