import { borderRadius, spacing } from "@/core/theme"
import { makeStyles, normalize, Skeleton } from "@rneui/themed"
import React from "react"
import { View } from "react-native"

const skeleton = new Array(10).fill(0)

const WordsSkeleton = () => {
    const styles = useStyles()
    return (
        <View>
            {skeleton.map((_, index) => (
                <View style={styles.container} key={index}>
                    <View style={styles.containerWord}>
                        <Skeleton height={normalize(20)} />
                        <Skeleton height={normalize(20)} />
                    </View>
                    <View style={{ flex: 5, height: "100%" }}>
                        <Skeleton height={"100%" as any} />
                    </View>
                </View>
            ))}
        </View>
    )
}

export default WordsSkeleton

const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flex: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.secondary,
            paddingHorizontal: spacing.large,
            paddingVertical: spacing.medium,
            borderRadius: borderRadius.base,
            marginBottom: spacing.medium,
            gap: spacing.medium,
        },
        containerWord: {
            flex: 5,
            gap: spacing.small,
        },
    }
})
