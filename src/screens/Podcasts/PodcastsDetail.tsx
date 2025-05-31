import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, View, LayoutChangeEvent } from 'react-native'
import Slider from '@react-native-community/slider'
import Video from 'react-native-video'
import { AppIcon, Wrapper } from '@/core/components'
import AppActionSheet from '@/core/components/AppActionSheet'
import { makeStyles, Text, useTheme } from '@rneui/themed'
import { usePodCasts } from './hooks/usePodCasts'
import { useGetPodCastByIdQuery } from '@/redux/reducers/Podcasts/podCastsService'

const PodcastsDetail = ({ route }: { route: any }) => {
    const { podcastId } = route.params
    const styles = useStyles()
    const { theme: { colors } } = useTheme()

    const { data } = useGetPodCastByIdQuery(podcastId)

    const podcast = data;

    const [seekMessage, setSeekMessage] = useState<string | null>(null)
    const toastTimeout = useRef<NodeJS.Timeout | null>(null)
    const [showSpeedSheet, setShowSpeedSheet] = useState(false)

    const scrollRef = useRef<ScrollView>(null)
    const segmentRefs = useRef<Record<string, number>>({})

    const {
        currentTime,
        duration,
        isPlaying,
        playbackRate,
        isBuffering,
        videoRef,
        togglePlayPause,
        seek,
        onSeek,
        changeSpeed,
        onProgress,
        onLoad,
        onBuffer,
    } = usePodCasts()

    const segments = podcast?.segments ?? []


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

    useEffect(() => {
        const activeSegment = segments.find((seg: any) => currentTime >= seg.start && currentTime < seg.end)
        if (activeSegment && segmentRefs.current[activeSegment.id] !== undefined) {
            scrollRef.current?.scrollTo({
                y: segmentRefs.current[activeSegment.id] - 100,
                animated: true,
            })
        }
    }, [currentTime])

    return (
        <Wrapper isSafeArea edges={['bottom']} containerStyle={styles.container}>
            <Image source={{ uri: podcast?.image }} style={styles.img} />

            <Video
                ref={videoRef}
                source={{ uri: podcast?.audioUrl }}
                paused={!isPlaying}
                onProgress={onProgress}
                onLoad={onLoad}
                onBuffer={onBuffer}
                playInBackground
                playWhenInactive
                ignoreSilentSwitch="ignore"
                rate={playbackRate}
                style={{ height: 0, width: 0 }}
            />

            <ScrollView
                ref={scrollRef}
                style={styles.transcriptArea}
                contentContainerStyle={styles.transcriptContent}
            >
                <Text style={styles.title}>{podcast?.title ?? 'Transcript'}</Text>
                {segments.map((segment: any) => {
                    const isActive = currentTime >= segment.start && currentTime < segment.end
                    return (
                        <Text
                            key={segment.start}
                            style={[styles.segment, isActive && styles.activeSegment]}
                            onLayout={(e: LayoutChangeEvent) => {
                                segmentRefs.current[segment.id] = e.nativeEvent.layout.y
                            }}
                        >
                            {segment.text}
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
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor="#ccc"
                    thumbTintColor={colors.primary}
                />

                <Text style={styles.timeLabel}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </Text>

                <View style={styles.controls}>
                    <AppIcon name="play-back" type="ionicon" onPress={() => handleSeek(-5)} color={colors.black} />
                    <AppIcon
                        name={isPlaying ? 'pause-circle' : 'play-circle'}
                        type="ionicon"
                        size={36}
                        onPress={togglePlayPause}
                        color={colors.black}
                    />
                    <AppIcon name="play-forward" type="ionicon" onPress={() => handleSeek(5)} color={colors.black} />
                    <View>
                        <AppIcon name="speed" type="material" onPress={() => setShowSpeedSheet(true)} color={colors.black} />
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


const useStyles = makeStyles(({ colors }) => ({
    img: {
        width: "auto",
        height: 200,
        margin: 10,
        borderRadius: 20,
    },
    container: {
        backgroundColor: colors.background,
    },
    transcriptArea: {
        flex: 1,
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    transcriptContent: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    segment: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
    },
    activeSegment: {
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        borderRadius: 6,
        padding: 4,
    },
    bottomControls: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
    },
    slider: { width: '100%', height: 40 },
    timeLabel: {
        fontSize: 14,
        color: colors.grey3,
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
        color: colors.black,
        marginBottom: 8,
    },
}))
