import { useEffect, useRef, useState } from 'react'
import Sound from 'react-native-sound'
import { logger } from '@/core/utils'
import { useAppSelector } from '@/core/hooks'

export const usePodCasts = (audioUrl?: string) => {
    const soundRef = useRef<Sound | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    
    const speed = useAppSelector((state) => state.root.app.speed)

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(speed)
    const [seekMessage, setSeekMessage] = useState<string | null>(null)


    useEffect(() => {
        if (!audioUrl) return

        Sound.setCategory('Playback')
        const sound = new Sound(audioUrl, undefined, (error) => {
            if (error) {
                logger.error('Load audio error', error)
                return
            }
            soundRef.current = sound
            setDuration(sound.getDuration())
        })

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            soundRef.current?.release()
            soundRef.current = null
        }
    }, [audioUrl])

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                soundRef.current?.getCurrentTime(setCurrentTime)
            }, 300)
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPlaying])

    const togglePlayPause = () => {
        if (!soundRef.current) return

        if (isPlaying) {
            soundRef.current.pause()
            setIsPlaying(false)
        } else {
            soundRef.current.setSpeed(playbackRate)
            soundRef.current.play((success) => {
                if (!success) console.log('Playback failed');
                setIsPlaying(false)
            })
            setIsPlaying(true)
        }
    }

    const seek = (seconds: number, onDone?: (message: string) => void) => {
        if (!soundRef.current) return
    
        soundRef.current.getCurrentTime((time) => {
            const newTime = Math.max(0, Math.min(time + seconds, duration))
            soundRef.current?.setCurrentTime(newTime)
            setCurrentTime(newTime)
    
            if (onDone) {
                const message = seconds > 0 ? `⏩ +${seconds}s` : `⏪ ${seconds}s`
                onDone(message)
            }
        })
    }
    
      

    const onSeek = (value: number) => {
        if (soundRef.current) {
            soundRef.current.setCurrentTime(value)
            setCurrentTime(value)
        }
    }

    const changeSpeed = (value: number) => {
        setPlaybackRate(value)
        soundRef.current?.setSpeed(value)
    }

    return {
        currentTime,
        duration,
        isPlaying,
        playbackRate,
        togglePlayPause,
        seek,
        onSeek,
        changeSpeed,
    }
}
