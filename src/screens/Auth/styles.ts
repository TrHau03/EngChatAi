import { padding } from "@/theme"
import { device } from "@/utils"
import { makeStyles, normalize } from "@rneui/themed"

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.background,
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
        },
        textTitle: {},
        textSubTitle: {
            textAlign: "center",
        },
        circle: {
            width: device().width * 2,
            aspectRatio: 1,
            borderRadius: device().width,
            backgroundColor: colors.black,
            position: "absolute",
            bottom: -device().height / 1.8,
        },
        btnLoginGoogle: {
            flex: 1,
            zIndex: 1,
        },
    }
})
