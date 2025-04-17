import { Segment } from "@/core/entities/segments"

export type PodcastItemData = {
  _id: string
  title: string
  topic: string
  image: string
  audioUrl: string
  text: string
  segments: Segment[]
  language: string
}

export type GetPodCastsResponse = PodcastItemData[];


