import { Wrapper } from "@/core/components"
import WordItem from "@/core/components/WordItem"
import { Word } from "@/core/entities/word"
import { useAudio } from "@/core/hooks/useAudio"
import { spacing } from "@/core/theme"
import { useGetWordsQuery } from "@/redux/reducers/Word/wordService"
import { makeStyles } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { FlatList } from "react-native"
import WordsSkeleton from "./components/WordsSkeleton"

const Words = () => {
    const styles = useStyles()
    const [query, setQuery] = useState<{
        cursor: string | null
        limit: number
    }>({
        cursor: null,
        limit: 20,
    })
    const { data, isError, isFetching, isLoading, isSuccess, refetch } = useGetWordsQuery(query)
    const { playAudio, stopAudio } = useAudio()

    const renderItem = useCallback(
        ({ item }: { item: Word }) => {
            return <WordItem {...item} onPlayAudio={playAudio} onStopAudio={stopAudio} />
        },
        [playAudio, stopAudio],
    )

    const onEndReached = () => {
        if (data) {
            setQuery((prev) => {
                return {
                    ...prev,
                    cursor: data.cursor,
                }
            })
        }
    }

    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            <FlatList
                data={data?.words}
                extraData={data}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderItem}
                removeClippedSubviews={true}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={10}
                updateCellsBatchingPeriod={50}
                onEndReachedThreshold={0.3}
                onRefresh={refetch}
                refreshing={isFetching}
                scrollEventThrottle={16}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={isFetching ? <WordsSkeleton /> : null}
                onEndReached={onEndReached}
            />
        </Wrapper>
    )
}

export default Words

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: spacing.medium,
        },
        contentContainer: {
            gap: spacing.medium,
        },
    }
})
