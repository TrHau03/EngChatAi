import React from "react"
import { View } from "react-native"
import { Edges, SafeAreaView } from "react-native-safe-area-context"

interface Props {
    children: React.ReactNode
    edges?: Edges
    isSafeArea?: boolean
}

const Wrapper: React.FC<Props> = ({ children, edges = ["bottom", "top"], isSafeArea }) => {
    if (isSafeArea) {
        return <View style={{ flex: 1 }}>{children}</View>
    }
    return (
        <SafeAreaView edges={edges} style={{ flex: 1 }}>
            {children}
        </SafeAreaView>
    )
}

export default Wrapper
