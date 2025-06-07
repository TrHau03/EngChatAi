import React from 'react'
import { useTheme } from "@rneui/themed"
import { FlatList } from "react-native"
import { Wrapper } from "@/core/components"
import TopicItem from "@/core/components/TopicItem"
import { RootStackParamEnum, RootStackParamList } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useGetTopicsQuery } from '@/redux/reducers/Topic/topicsService'
import { Topic } from '@/redux/reducers/Topic/topicsType'
import data from "../../assets/topics.json"

const Topics = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { theme: { colors } } = useTheme()

  const { data: topics, isLoading, error } = useGetTopicsQuery()

  return (
    <Wrapper isSafeArea edges={['bottom']} containerStyle={{ backgroundColor: colors.background }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }: { item: Topic }) => (
          <TopicItem
            topic={item}
            onPress={() =>
              navigation.navigate(RootStackParamEnum.WordByTopic, { title: item.title })
            }
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </Wrapper>
  )
}

export default Topics
