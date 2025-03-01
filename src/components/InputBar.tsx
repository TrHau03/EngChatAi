import { makeStyles } from "@rneui/themed"
import React, { useState } from "react"
import { TextInput, View } from "react-native"

const InputBar = () => {
    const styles = useStyles(0)
    const [input, setInput] = useState("")
    return (
        <View style={styles.container}>
            <TextInput
                value={input}
                onChangeText={setInput}
                style={{ color: "#fff", backgroundColor: "red", height: 100, width: "100%" }}
            />
        </View>
    )
}

export default InputBar

const useStyles = makeStyles(({}) => {
    return {
        container: {
            flexDirection: "row",
        },
    }
})
