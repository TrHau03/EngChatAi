import { EmptyList, Wrapper } from "@/core/components"
import SearchBar from "@/core/components/SearchBar"
import WordItem from "@/core/components/WordItem"
import { Word } from "@/core/entities/word"
import { spacing } from "@/core/theme"
import { makeStyles, useTheme } from "@rneui/themed"
import React, { useCallback, useMemo } from "react"
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native"
import WordsSkeleton from "./components/WordsSkeleton"
import { useWords } from "./hooks/useWords"

const Words = () => {
    const styles = useStyles()
    const {
        theme: { colors },
    } = useTheme()
    const flatListRef = React.useRef<FlatList>(null)
    const { isFetching, isSearching, data, isLoading, handleSearch, onEndReached, refetch } = useWords(flatListRef)

    const renderItem = useCallback(({ item }: { item: Word }) => {
        return <WordItem {...item} />
    }, [])

    const renderEmpty = useCallback(() => {
        return <EmptyList />
    }, [])
    const refreshControl = useMemo(() => {
        return (
            <RefreshControl
                refreshing={isFetching}
                onRefresh={refetch}
                colors={[colors.primary]}
                tintColor={colors.primary}
            />
        )
    }, [isFetching])
    return (
        <Wrapper isSafeArea containerStyle={styles.container}>
            {isSearching || isLoading ? (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <>
                    <SearchBar onChangeText={handleSearch} />
                    <FlatList
                        ref={flatListRef}
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
                        refreshControl={refreshControl}
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={isFetching && !isLoading ? <WordsSkeleton /> : null}
                        ListEmptyComponent={!isLoading && !isFetching && data?.words.length === 0 ? null : renderEmpty}
                        onEndReached={onEndReached}
                    />
                </>
            )}
        </Wrapper>
    )
}

export default Words

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
            paddingHorizontal: spacing.medium,
            gap: spacing.medium,
        },
        contentContainer: {
            gap: spacing.medium,
        },
    }
})
