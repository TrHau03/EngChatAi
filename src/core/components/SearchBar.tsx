import { Input } from "@rneui/themed"
import React, { useState } from "react"
import { View } from "react-native"
import { useDebounce } from "../hooks/useDebounce"

interface SearchBarProps {
    onChangeText: (text: string) => void
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { onChangeText } = props
    const [input, setInput] = useState("")
    const debouncedValue = useDebounce(input, 500)

    React.useEffect(() => {
        onChangeText(debouncedValue)
    }, [debouncedValue])

    return (
        <View>
            <Input value={input} onChangeText={setInput} />
        </View>
    )
}

export default SearchBar
