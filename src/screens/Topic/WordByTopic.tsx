import React, { useCallback, useMemo, useRef } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import { makeStyles, Text, useTheme } from '@rneui/themed'
import { useGetWordByTopicQuery } from '@/redux/reducers/Topic/topicsService'
import { WordByTopic as WordByTopicType } from '@/redux/reducers/Topic/topicsType'
import { Wrapper } from '@/core/components'
import { spacing } from '@/core/theme'
import WordByTopicItem from '@/core/components/WordByTopicItem'
import dataWordTopic from '../../assets/wordsbytopics.json'

const WordByTopic = ({ route }: { route: any }) => {
    const { title } = route.params
    const styles = useStyles()
    const flatListRef = useRef<FlatList>(null)

    const {
        theme: { colors },
    } = useTheme()

    const { data, isLoading, isFetching, refetch } = useGetWordByTopicQuery(title)

    const renderItem = useCallback(({ item }: { item: WordByTopicType }) => {
        return <WordByTopicItem {...item} />
    }, [])

    const renderEmpty = useCallback(() => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No words found.</Text>
            </View>
        )
    }, [])

    const refreshControl = useMemo(() => (
        <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={[colors.primary]}
            tintColor={colors.primary}
        />
    ), [isFetching])

    return (
        <Wrapper isSafeArea edges={['bottom']} containerStyle={styles.container}>
            <Text style={styles.title}>Words in Topic: {title}</Text>
            {/* {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} />
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={data || []}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={refreshControl}
                    ListEmptyComponent={renderEmpty}
                    showsVerticalScrollIndicator={false}
                />
            )} */}
            <FlatList
                ref={flatListRef}
                data={dataWordTopic}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
                refreshControl={refreshControl}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
            />
        </Wrapper>
    )
}

export default WordByTopic

const useStyles = makeStyles(({ colors }) => ({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.medium,
    },
    contentContainer: {
        gap: spacing.medium,
        paddingBottom: spacing.large,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
        color: colors.primary,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.large,
    },
    emptyText: {
        fontSize: 16,
        color: colors.grey3,
    },
}))
