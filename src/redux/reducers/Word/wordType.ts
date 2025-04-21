import { Word } from "@/core/entities/word"

export interface WordsRequest {
    cursor: string | null
    limit: number
    search?: string
}

export interface WordsResponse {
    words: Word[]
    cursor: string | null
    isEndList: boolean
}
