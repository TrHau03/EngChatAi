import { RootStack } from "@/navigations"
import { theme } from "@/theme/index"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@rneui/themed"
import React from "react"

GoogleSignin.configure({
    iosClientId: process.env.IOS_CLIENT,
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
