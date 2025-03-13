import { Button, normalize, Text } from "@rneui/themed"
import LottieView from "lottie-react-native"
import React, { type ComponentType, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { fontSize, spacing } from "../theme"
import Wrapper from "./Wrapper"

export type Props = { error: Error | null; resetError: () => void }

const FallbackComponent: React.FC<Props> = (props) => {
    const { t } = useTranslation()
    return (
        <Wrapper isSafeArea containerStyle={{ justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("@/assets/animations/error.json")}
                autoPlay
                loop
                style={{ width: normalize(248), aspectRatio: 1 }}
            />
            <View style={{ justifyContent: "center", alignItems: "center", gap: spacing.base }}>
                <Text style={{ fontSize: fontSize.xl, fontWeight: "bold" }}>{t("somethingsWentWrong")}</Text>
                <Text style={{ fontSize: fontSize.medium }}>{props.error?.message}</Text>
                <Button title={t("tryAgain")} onPress={props.resetError} />
            </View>
        </Wrapper>
    )
}

export type PropsErrorBoundary = {
    children: Exclude<NonNullable<ReactNode>, string | number | boolean>
    FallbackComponent: ComponentType<Props>
    onError?: (error: Error, componentStack: string) => void
}

type State = { error: Error | null }

export class ErrorBoundary extends React.Component<PropsErrorBoundary, State> {
    state: State = { error: null }

    static defaultProps: {
        FallbackComponent: ComponentType<Props>
    } = {
        FallbackComponent: FallbackComponent,
    }

    static getDerivedStateFromError(error: Error): State {
        return { error }
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        if (typeof this.props.onError === "function") {
            this.props.onError(error, info.componentStack)
        }
    }

    resetError: () => void = () => {
        this.setState({ error: null })
    }

    render() {
        const { FallbackComponent } = this.props
        return this.state.error ? (
            <FallbackComponent error={this.state.error} resetError={this.resetError} />
        ) : (
            this.props.children
        )
    }
}
