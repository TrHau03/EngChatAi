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
            keepUnusedDataFor: 5000,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newItems, { arg }) => {
                if (arg.cursor === null) {
                    return {
                        words: newItems.words,
                        cursor: newItems.cursor,
                        isEndList: newItems.isEndList,
                    }
                }
                return {
                    words: [...currentCache.words, ...newItems.words],
                    cursor: newItems.cursor,
                    isEndList: newItems.isEndList,
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
    }),
})

export const { useGetWordsQuery } = wordService
