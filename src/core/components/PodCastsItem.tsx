import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { Text, useTheme, makeStyles, normalize } from "@rneui/themed"
import { fontSize } from "../theme"

interface PodcastItemProps {
    title: string
    language: string
    image: string
    topic: string
    onPress: () => void
}

const PodcastItem: React.FC<PodcastItemProps> = ({ title, language, image, topic, onPress }) => {
    const styles = useStyles()
    const {
        theme: { colors },
    } = useTheme()

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.topic}>{topic}</Text>
                <Text style={styles.language}>{language}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PodcastItem

const useStyles = makeStyles(({ colors }) => ({
    container: {
        marginBottom: 40,
        borderRadius: 16,
        backgroundColor: colors.background
    },
    image: {
        width: "100%",
        marginBottom: 16,
        borderRadius: 16,
        height: normalize(200),
    },
    title: {
        left: 12,
        fontSize: fontSize.large,
        fontWeight: "800",
        color: colors.primary,
        textShadowRadius: 2,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center",
        paddingHorizontal: 12,
        marginTop: 5,
    },
    topic: {
        fontSize: fontSize.normal,
        color: colors.primary,
        textShadowRadius: 1,
    },
    language: {
        fontSize: fontSize.medium,
        color: colors.primary,
        textShadowRadius: 1,
    },
}))