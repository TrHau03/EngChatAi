import { AppActionSheet } from "@/core/components"
import React, { useState } from "react"
import { Text, View } from "react-native"

const Home = () => {
    const [visible, setVisible] = useState(true)
    return (
        <View>
            <Text>Home</Text>
            <AppActionSheet
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                onClose={() => setVisible(false)}
                descriptions={{ title: "ActionSheet", description: "Description action sheet" }}
                actions={[
                    {
                        title: "Hello",
                        type: "default",
                        onPress: () => {
                            setVisible(false)
                        },
                    },
                    {
                        title: "Hello",
                        type: "destructive",
                        onPress: () => {
                            setVisible(false)
                        },
                    },
                ]}
            />
        </View>
    )
}

export default Home
