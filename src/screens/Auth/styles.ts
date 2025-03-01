import { fontSize, fontWeight, padding, spacing } from "@/theme"
import { device } from "@/utils"
import { makeStyles, normalize } from "@rneui/themed"

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: "#1a1a1a",
            alignItems: "center",
            paddingHorizontal: padding.medium,
        },
        logo: {
            width: normalize(280),
            height: normalize(280),
        },
        containerTitle: {
            flex: 2,
            maxWidth: "80%",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: spacing.base,
        },
        textTitle: {
            fontSize: fontSize.xxxl,
            color: colors.black,
            fontWeight: fontWeight.bold as any,
        },
        textSubTitle: {
            textAlign: "center",
            fontSize: fontSize.medium,
            color: colors.black,
        },
        circle: {
            width: device().width * 2,
            aspectRatio: 1,
            borderRadius: device().width,
            backgroundColor: "transparent",
            position: "absolute",
            bottom: -device().height / 1.8,
        },
        btnLoginGoogle: {
            flex: 1,
            zIndex: 1,
        },
    }
})
