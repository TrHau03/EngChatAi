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
                <Text style={styles.language}>{language || 'unknow'}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PodcastItem

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
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        marginTop: 5,
    },
    topic: {
        fontSize: fontSize.normal,
        color: mode === 'light' ? colors.black : '#fff',
        textShadowRadius: 1,
    },
    language: {
        fontSize: fontSize.medium,
        color: mode === 'light' ? colors.black : '#fff',
        textShadowRadius: 1,
    },
}))
