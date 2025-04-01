import { Wrapper } from "@/core/components"
import { RootStackParamEnum, RootStackParamList } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Button } from "@rneui/themed"
import React from "react"

const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    return (
        <Wrapper isSafeArea>
            <Button title={"na"} onPress={() => navigation.navigate(RootStackParamEnum.QuestionAndAnswer)} />
        </Wrapper>
    )
}

export default Home
