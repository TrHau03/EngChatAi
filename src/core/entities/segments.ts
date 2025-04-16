export type Segment = {
  id: number
  start: number
  end: number
  seek: number
  text: string
  tokens: number[]
  temperature: number
  avg_logprob: number
  compression_ratio: number
  no_speech_prob: number
}

export type Transcript = {
  speaker: string
  text: string
}