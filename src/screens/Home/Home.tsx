import React from "react"
import { Button, FlatList, Image, Text, TouchableOpacity } from "react-native"
import { AppLoading, Wrapper } from "@/core/components"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamEnum, RootStackParamList } from "@/navigation/stack/RootStack"
import { useTheme, makeStyles, normalize } from "@rneui/themed"
import { fontSize, spacing } from "@/core/theme"
import { useTranslation } from "react-i18next"
import { useGetPodCastsQuery } from "@/redux/reducers/Podcasts/podCastsService"

interface PodcastItemData {
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
  const { isFetching, data, isLoading } = useGetPodCastsQuery()

  const navigateToPodcastsDetail = () => {
    navigation.navigate(RootStackParamEnum.Podcasts);
  };

  const renderPodcastItem = ({ item }: { item: PodcastItemData }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(RootStackParamEnum.PodcastDetail, { podcastId: item._id })}
      style={styles.podcastItemContainer}
    >
      <Image source={{ uri: item.image }} style={styles.podcastItemImage} />
      <Text style={styles.podcastItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  // End PodCasts

  return (
    <Wrapper isSafeArea containerStyle={styles.container}>

      {/* PodCasts */}
      {!isLoading && !isFetching ? (
        data && data.length > 0 ? (
          <>
            <TouchableOpacity onPress={navigateToPodcastsDetail} style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>{t("seeall")}</Text>
            </TouchableOpacity>
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={renderPodcastItem}
            />
          </>
        ) : null
      ) : (
        <AppLoading isLoading />
      )}
      {/* End PodCasts */}

      <Button title={"Q&A"} onPress={() => navigation.navigate(RootStackParamEnum.QuestionAndAnswer)} />
      <Button title={"Words"} onPress={() => navigation.navigate(RootStackParamEnum.Words)} />
    </Wrapper>
  )
}

export default Home


const usePodcastItemStyles = makeStyles(({ colors, mode }) => {
  return {
    container: {
      backgroundColor: colors.background
    },

    //PodCasts Styles
    podcastItemContainer: {
      backgroundColor: mode === 'light' ? '#fff' : '#0B1A2F',
      borderRadius: 6,
      paddingBottom: 5,
      marginBottom: spacing.small,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: mode === 'light' ? 0.2 : 0,
      shadowRadius: 2,
      elevation: mode === 'light' ? 3 : 0,
      overflow: 'hidden',
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
    viewAllContainer: {
      padding: spacing.medium,
      alignItems: 'flex-end',
    },
    viewAllText: {
      fontSize: fontSize.medium,
      color: colors.primary,
      fontWeight: 'bold',
    },
    // End PodCasts Styles


    
  }
})