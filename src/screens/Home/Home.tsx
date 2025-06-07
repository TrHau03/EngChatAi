import React, { useMemo } from "react"
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { AppLoading, Wrapper } from "@/core/components"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamEnum, RootStackParamList } from "@/navigation/stack/RootStack"
import { useTheme, makeStyles, normalize } from "@rneui/themed"
import { fontSize, spacing } from "@/core/theme"
import { useTranslation } from "react-i18next"
import { useGetPodCastsQuery } from "@/redux/reducers/Podcasts/podCastsService"
import { getRandomItems } from "@/core/utils/getRandomItems"
import { useGetTopicsQuery } from "@/redux/reducers/Topic/topicsService"
import datatopic from "../../assets/topics.json"

interface ItemData {
  _id: string;
  title: string;
  image: string;
}


const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {
    theme: { colors },
  } = useTheme()
  const styles = usePodcastItemStyles()
  const { t } = useTranslation()

  // PodCasts 
  const {
    isFetching: isFetchingPodcasts,
    data: podcastsData,
    isLoading: isLoadingPodcasts,
  } = useGetPodCastsQuery()

  const navigateToPodcastsDetail = () => {
    navigation.navigate(RootStackParamEnum.Podcasts);
  };

  const randomPodcasts = useMemo(() => {
    if (!podcastsData) return [];
    return getRandomItems(podcastsData, 3);
  }, [podcastsData]);

  const renderPodcastItem = ({ item }: { item: ItemData }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(RootStackParamEnum.PodcastDetail, { podcastId: item._id })}
      style={styles.podcastItemContainer}
    >
      <Image source={{ uri: item.image }} style={styles.podcastItemImage} />
      <Text style={styles.podcastItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  // End PodCasts

  // Topics
  const { isFetching: isFetchingTopics, data: topicsData, isLoading: isLoadingTopics } = useGetTopicsQuery()

  const navigateToTopics = () => {
    navigation.navigate(RootStackParamEnum.Topics);
  };

  const randomTopics = useMemo(() => {
    if (!topicsData) return [];
    return getRandomItems(topicsData, 1);
  }, [topicsData]);

  const renderTopicItem = ({ item }: { item: ItemData }) => (
    <TouchableOpacity
      style={styles.topicItemContainer}
      onPress={() =>
        navigation.navigate(RootStackParamEnum.WordByTopic, {
          title: item.title,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.topicItemImage} />
      <Text style={styles.topicItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  )
  // End Topics

  return (
    <Wrapper isSafeArea containerStyle={styles.container}>

      {/* PodCasts */}
      {!isLoadingPodcasts && !isFetchingPodcasts ? (
        podcastsData && podcastsData.length > 0 ? (
          <>
            <TouchableOpacity onPress={navigateToPodcastsDetail} style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>{t("seeall")}</Text>
            </TouchableOpacity>
            <FlatList
              data={randomPodcasts}
              keyExtractor={(item) => item._id}
              renderItem={renderPodcastItem}
            />
          </>
        ) : null
      ) : (
        <AppLoading isLoading />
      )}
      {/* End PodCasts */}

      {/* Topics */}

      {/* {!isLoadingTopics && !isFetchingTopics ? (
        topicsData && topicsData.length > 0 ? (
          <>
            <TouchableOpacity onPress={navigateToTopics} style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>{t("seeall")}</Text>
            </TouchableOpacity>
            <View style={styles.topicListContainer}>
              <FlatList
                data={datatopic}
                keyExtractor={(item) => item._id}
                horizontal
                renderItem={renderTopicItem}
              />
            </View>
          </>
        ) : null
      ) : (
        <AppLoading isLoading />
      )} */}

      <TouchableOpacity onPress={navigateToTopics} style={styles.viewAllContainer}>
        <Text style={styles.viewAllText}>{t("seeall")}</Text>
      </TouchableOpacity>
      <View style={styles.topicListContainer}>
        <FlatList
          data={datatopic}
          keyExtractor={(item) => item._id}
          horizontal
          renderItem={renderTopicItem}
        />
      </View>
      {/* End Topics */}

      <Button title={"Q&A"} onPress={() => navigation.navigate(RootStackParamEnum.QuestionAndAnswer)} />
      <Button title={"Words"} onPress={() => navigation.navigate(RootStackParamEnum.Words)} />
    </Wrapper>
  )
}

export default Home


const usePodcastItemStyles = makeStyles(({ colors, mode }) => {
  return {
    container: {
      backgroundColor: colors.background,
    },

    viewAllContainer: {
      padding: spacing.medium,
      alignItems: 'flex-end',
    },
    viewAllText: {
      fontSize: fontSize.medium,
      color: colors.primary,
      fontWeight: 'bold',
    },

    // Podcasts
    podcastItemContainer: {
      backgroundColor: mode === 'light' ? '#fff' : '#0B1A2F',
      borderRadius: 6,
      paddingBottom: 5,
      margin: 10,
    },
    podcastItemImage: {
      width: '100%',
      height: normalize(100),
      resizeMode: 'cover',
    },
    podcastItemTitle: {
      paddingVertical: spacing.small,
      paddingHorizontal: spacing.small,
      fontSize: fontSize.medium,
      fontWeight: 'bold',
      color: mode === 'light' ? colors.black : '#fff',
    },

    // Topics
    topicListContainer: {
      paddingHorizontal: spacing.medium,
    },
    topicItemContainer: {
      width: normalize(140),
      height: normalize(160),
      backgroundColor: mode === 'light' ? '#fff' : '#0B1A2F',
      borderRadius: 20,
      marginRight: spacing.medium,
      marginBottom: spacing.large,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    topicItemImage: {
      width: '100%',
      height: normalize(110),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      resizeMode: 'cover',
    },
    topicItemTitle: {
      padding: spacing.small,
      fontSize: fontSize.medium,
      fontWeight: 'bold',
      textAlign: 'center',
      color: mode === 'light' ? colors.black : '#fff',
      flex: 1,
      textAlignVertical: 'center',
    },
  }
})
