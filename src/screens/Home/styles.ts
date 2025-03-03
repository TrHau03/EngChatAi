import { fontSize, fontWeight, padding, spacing, margin, borderRadius, shadow } from "@/theme"

import { device } from "@/utils"
import { color } from "@rneui/base"
import { makeStyles, normalize } from "@rneui/themed"
import { Colors } from "react-native/Libraries/NewAppScreen"

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: "#1a1a1a",
            alignItems: "center",
            paddingHorizontal: padding.medium,
        },
        header: {
            width: "100%",
            height: "auto",
            marginTop: margin.base,
            flexDirection: "row",
            alignItems: "center",
        },
        body: {
            flex: 1,
            width: "100%",
            // backgroundColor: colors.primary,
            marginTop: margin.large,
            gap: spacing.medium,
        },
        rightHeader: {
            flex: 1,
            marginLeft: spacing.large,
            justifyContent: "center",
            marginVertical: margin.small,
        },
        avatar: {
            width: normalize(55),
            height: normalize(55),
        },
        name: {
            fontSize: fontSize.medium,
            color: colors.black,
        },
        welcome: {
            color: colors.disabled,
            fontSize: fontSize.base,
        },
        banner: {
            width: "100%",
            height: device().height / 6,
            borderRadius: borderRadius.base,
            backgroundColor: "transparent",
            paddingHorizontal: padding.large,
            paddingVertical: padding.medium,
            flexDirection: "row",
            gap: margin.base,
        },
        leftBanner: {
            flex: 7.5,
        },
        rightBanner: {
            flex: 2.5,
            alignItems: "flex-end",
            justifyContent: "flex-end",
        },
        bannerTitle: {
            fontSize: fontSize.medium,
            color: colors.black,
            fontWeight: fontWeight.bold as any,
        },
        bannerDesc: {
            fontSize: fontSize.base,
            color: colors.black,
            marginTop: spacing.medium,
        },
        bannerButton: {
            width: normalize(80),
            height: normalize(40),
            borderRadius: normalize(20),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#bcd4e6",
        },
        processing: {
            width: "100%",
            height: device().height / 6,
            borderRadius: borderRadius.base,
            backgroundColor: colors.black,
            paddingHorizontal: padding.large,
            paddingVertical: padding.medium,
            gap: spacing.medium,
        },
        processingTop: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        processingTitle: {
            fontSize: fontSize.medium,
            color: colors.white,
            fontWeight: fontWeight.bold as any,
        },
        iconProcessing: {
            color: colors.white,
        },
        processingBottom: {
            flex: 1,
            backgroundColor: colors.black,
            alignItems: "center",
            borderRadius: borderRadius.small,
            flexDirection: "row",
            paddingHorizontal: padding.small,
            ...shadow.medium,
        },
        leftProress: {
            flex: 2,
        },
        middleProcesss: {
            justifyContent: "space-between",
            flex: 6,
        },
        rightProcess: {
            flex: 2,
        },
        logo: {
            width: normalize(70),
            height: normalize(70),
        },
        wrapperNameCourse: {
            flexDirection: "row",
            gap: spacing.small,
        },
        processingNameCourse: {
            fontSize: fontSize.base,
            color: colors.white,
            fontWeight: fontWeight.bold as any,
        },
        processingTypeCourse: {
            fontSize: fontSize.small,
            color: colors.disabled,
        },
    }
})
