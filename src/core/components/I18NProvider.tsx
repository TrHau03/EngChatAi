import i18next from "i18next"
import React, { useCallback, useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import { useAppSelector } from "../hooks"
import { logger } from "../utils"

i18next.init({
    fallbackLng: "en",
    compatibilityJSON: "v4",
    interpolation: { escapeValue: false },
    resources: {
        en: { translation: require("@/assets/languages/en.json") },
        vi: { translation: require("@/assets/languages/vi.json") },
    },
})

const I18NProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const language = useAppSelector((state) => state.root.app.language)

    useEffect(() => {
        i18next.changeLanguage(language).catch((error: any) => { logger.error("changeLanguage", error) })
    }, [language])

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default I18NProvider
