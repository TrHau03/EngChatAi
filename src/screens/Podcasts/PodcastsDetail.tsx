import React, { useRef, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import Slider from '@react-native-community/slider'
import { useGetPodCastByIdQuery } from '@/redux/reducers/Podcasts/podCastsService'
import { usePodCasts } from './hooks/usePodCasts'
import { AppIcon, Wrapper } from '@/core/components'
import AppActionSheet from '@/core/components/AppActionSheet'
import { makeStyles, Text, useTheme } from '@rneui/themed'

const PodcastsDetail = ({ podcastId }: { podcastId: string }) => {
    const { data } = useGetPodCastByIdQuery(podcastId)
    const styles = useStyles()
    const { theme: { colors } } = useTheme()

    const [seekMessage, setSeekMessage] = useState<string | null>(null)
    const toastTimeout = useRef<NodeJS.Timeout | null>(null)
    const [showSpeedSheet, setShowSpeedSheet] = useState(false)

    const {
        currentTime,
        duration,
        isPlaying,
        playbackRate,
        togglePlayPause,
        seek,
        onSeek,
        changeSpeed,
    } = usePodCasts(data?.audioUrl)

    const segments = data?.segments ?? []

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleSeek = (value: number) => {
        seek(value, (message) => {
            setSeekMessage(message)
            if (toastTimeout.current) clearTimeout(toastTimeout.current)
            toastTimeout.current = setTimeout(() => setSeekMessage(null), 1000)
        })
    }

    const handleSelectSpeed = (value: number) => {
        changeSpeed(value)
        setShowSpeedSheet(false)
    }

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <Image
                source={{ uri: data?.image }}
                style={styles.img}
            />
            <ScrollView style={styles.transcriptArea} contentContainerStyle={styles.transcriptContent}>
                <Text style={styles.title}>{data?.title ?? 'Transcript'}</Text>
                {segments.map((segment) => {
                    const isActive = currentTime >= segment.start && currentTime < segment.end
                    return (
                        <Text key={segment.id} style={[styles.segment, isActive && styles.activeSegment]}>
                            {segment.text + ' '}
                        </Text>
                    )
                })}
            </ScrollView>

            <View style={styles.bottomControls}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    onSlidingComplete={onSeek}
                    minimumTrackTintColor="#007AFF"
                    maximumTrackTintColor="#ccc"
                    thumbTintColor="#007AFF"
                />

                <Text style={styles.timeLabel}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </Text>

                <View style={styles.controls}>
                    <AppIcon name="play-back" type="ionicon" onPress={() => handleSeek(-5)} color="#000" />
                    <AppIcon
                        name={isPlaying ? 'pause-circle' : 'play-circle'}
                        type="ionicon"
                        size={36}
                        onPress={togglePlayPause}
                        color="#000"
                    />
                    <AppIcon name="play-forward" type="ionicon" onPress={() => handleSeek(5)} color="#000" />
                    <View>
                        <AppIcon name="speed" type="material" onPress={() => setShowSpeedSheet(true)} color="#000" />
                        <Text style={styles.speedDisplay}>{playbackRate.toFixed(2)}x</Text>
                    </View>
                </View>

                {seekMessage && (
                    <View style={styles.seekToast}>
                        <Text style={styles.seekToastText}>{seekMessage}</Text>
                    </View>
                )}
            </View>

            <AppActionSheet
                visible={showSpeedSheet}
                onClose={() => setShowSpeedSheet(false)}
                onBackdropPress={() => setShowSpeedSheet(false)}
                descriptions={{ title: 'Playback Speed', description: 'Select your preferred speed' }}
                actions={[0.5, 0.75, 1, 1.25, 1.5, 2].map((value) => ({
                    title: `${value}x`,
                    type: 'default',
                    onPress: () => handleSelectSpeed(value),
                }))}
            />
        </Wrapper>
    )
}

export default PodcastsDetail

const useStyles = makeStyles(() => ({
    img: {
        width: '100%',
        height: 200
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    transcriptArea: {
        flex: 1,
        marginBottom: 10,
        paddingHorizontal: 16
    },
    transcriptContent: {
        paddingVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16
    },
    segment: {
        padding: 4,
        fontSize: 16
    },
    activeSegment: {
        backgroundColor: 'yellow'
    },
    bottomControls: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    slider: { width: '100%', height: 40 },
    timeLabel: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 4,
    },
    seekToast: {
        position: 'absolute',
        top: '40%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        zIndex: 999,
    },
    seekToastText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    speedDisplay: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
}))
