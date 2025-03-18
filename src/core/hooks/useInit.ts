import { useAppDispatch, useAppSelector } from "./useRedux"

export const useInit = () => {
    const dispatch = useAppDispatch()
    const language = useAppSelector((state) => state.root.app.language)

    return {}
}
