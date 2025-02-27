import { RootStack } from "@/navigations"
import { theme } from "@/theme/index"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@rneui/themed"
import { configApp } from "app.config"
import React from "react"
configApp()
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
