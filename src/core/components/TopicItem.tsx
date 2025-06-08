import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { Text, useTheme, makeStyles, normalize } from "@rneui/themed"
import { fontSize } from "../theme"
import { Topic } from "@/redux/reducers/Topic/topicsType"

interface TopicItemProps {
  topic: Topic
  onPress: () => void
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, onPress }) => {
  const styles = useStyles()
  const {
    theme: { colors },
  } = useTheme()

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: topic.image }}
        style={styles.image}
      />
      <Text style={styles.title}>{topic.title}</Text>
    </TouchableOpacity>
  )
}

export default TopicItem

const useStyles = makeStyles(({ colors, mode }) => ({
  container: {
    marginBottom: 20,
    paddingBottom: 10,
    borderRadius: 16,
    backgroundColor: mode === 'light' ? '#fff' : '#0B1A2F',
    shadowColor: mode === 'light' ? '#000' : undefined,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: mode === 'light' ? 0.2 : 0,
    shadowRadius: 2,
    elevation: mode === 'light' ? 3 : 0,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    marginBottom: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: normalize(200),
  },
  title: {
    left: 12,
    fontSize: fontSize.large,
    fontWeight: "800",
    color: mode === 'light' ? colors.black : '#fff',
    textShadowRadius: 2,
  },
}))
