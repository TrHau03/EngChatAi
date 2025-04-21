import { useGetWordsQuery } from "@/redux/reducers/Word/wordService"
import { WordsRequest, WordsResponse } from "@/redux/reducers/Word/wordType"
import { RefObject, useEffect, useState } from "react"
import { FlatList } from "react-native"

export const useWords = (flatListRef: RefObject<FlatList<any> | null>) => {
    const [query, setQuery] = useState<WordsRequest>({
        cursor: null,
        search: "",
        limit: 20,
    })
    const { data: wordsData, isError, isFetching, isLoading, isSuccess } = useGetWordsQuery(query)
    const [data, setData] = useState<WordsResponse | null>()
    const [isSearching, setIsSearching] = useState(false)
    useEffect(() => {
        if (!isLoading && !isFetching) {
            setData(wordsData)
            setIsSearching(false)
        }
    }, [wordsData])

    const onEndReached = () => {
        if (data && !data.isEndList) {
            setQuery((prev) => {
                return {
                    ...prev,
                    cursor: data.cursor,
                }
            })
        }
    }
    const handleSearch = (value: string) => {
        setIsSearching(true)
        setQuery((prev) => ({
            ...prev,
            cursor: null,
            search: value,
        }))
    }

    const refetch = () => {
        setQuery((prev) => ({
            ...prev,
            search: "",
            cursor: null,
        }))
    }

    return {
        isSearching,
        data,
        isFetching,
        isLoading,
        onEndReached,
        handleSearch,
        refetch,
    }
}
