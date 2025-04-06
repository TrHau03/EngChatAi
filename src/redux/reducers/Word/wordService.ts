import { apiService } from "@/redux/apiService"
import { WordsRequest, WordsResponse } from "./wordType"

export class WordEndpoint {
    static getWords = "/words"
}

export const wordService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getWords: builder.query<WordsResponse, WordsRequest>({
            query: (body) => ({
                url: `${WordEndpoint.getWords}?cursor=${body.cursor}&limit=${body.limit}&search=${body.search}`,
                method: "GET",
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                return {
                    words: [...currentCache.words, ...newItems.words],
                    cursor: newItems.cursor,
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    }),
})

export const { useGetWordsQuery } = wordService
