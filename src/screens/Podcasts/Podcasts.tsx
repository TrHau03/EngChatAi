import React from 'react'
import { makeStyles, useTheme } from "@rneui/themed"
import { FlatList } from "react-native"
import { Wrapper } from "@/core/components"
import PodcastItem from "@/core/components/PodCastsItem"
import { RootStackParamEnum, RootStackParamList } from "@/navigation/stack/RootStack"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useGetPodCastsQuery } from '@/redux/reducers/Podcasts/podCastsService'


const Podcasts = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    theme: { colors },
  } = useTheme()
  const { data } = useGetPodCastsQuery()

  return (
    <Wrapper isSafeArea containerStyle={{ backgroundColor: colors.background }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PodcastItem
            title={item.title}
            language={item.language}
            image={item.image}
            topic={item.topic}
            onPress={() =>
              navigation.navigate(RootStackParamEnum.PodcastDetail, { podcastId: item._id })
            }
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </Wrapper>
  )
}

export default Podcasts

