import { useRef, useState } from 'react'
import { useAppSelector } from '@/core/hooks'

export const usePodCasts = () => {
    const videoRef = useRef<any>(null)

    const speed = useAppSelector((state) => state.root.app.speed)

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(speed)
    const [isBuffering, setIsBuffering] = useState(false)

    const onProgress = (data: { currentTime: number }) => {
        setCurrentTime(data.currentTime)
    }

    const onLoad = (data: { duration: number }) => {
        setDuration(data.duration)
    }

    const onBuffer = (data: { isBuffering: boolean }) => {
        setIsBuffering(data.isBuffering)
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const seek = (seconds: number, onDone?: (message: string) => void) => {
        if (!videoRef.current) return

        const newTime = Math.max(0, Math.min(currentTime + seconds, duration))
        videoRef.current.seek?.(newTime)
        setCurrentTime(newTime)

        if (onDone) {
            const message = seconds > 0 ? `⏩ +${seconds}s` : `⏪ ${seconds}s`
            onDone(message)
        }
    }

    const onSeek = (value: number) => {
        if (videoRef.current) {
            videoRef.current.seek(value)
            setCurrentTime(value)
        }
    }

    const changeSpeed = (value: number) => {
        setPlaybackRate(value)
    }

    return {
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
    }
}
