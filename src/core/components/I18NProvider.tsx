import i18next from "i18next"
import React, { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import { useAppSelector } from "../hooks"

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
        if (i18next.language !== language) {
            i18next.changeLanguage(language).catch(console.error)
        }
    }, [language])

    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default I18NProvider

// interface I18NProviderProps {
//     children: React.ReactNode
// }

// const I18NProvider: React.FC<I18NProviderProps> = (props) => {
//     const language = useAppSelector((state) => state.root.app.language)
//     i18next.init({
//         lng: language,
//         resources: {
//             en: {
//                 translation: require("@/assets/languages/en.json"),
//             },
//             vi: {
//                 translation: require("@/assets/languages/vi.json"),
//             },
//         },
//         fallbackLng: "en",
//         compatibilityJSON: "v4",
//         interpolation: {
//             escapeValue: false,
//         },
//     })

//     return <I18nextProvider i18n={i18next}>{props.children}</I18nextProvider>
// }

// export default I18NProvider
