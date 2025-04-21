import { googleAuthentication } from "@/core/func"
import { useAppDispatch } from "@/core/hooks"
import { useLoginMutation } from "@/redux/reducers/Auth/authService"
import { authAction } from "@/redux/reducers/Auth/authSlice"

export const useSignIn = () => {
    const dispatch = useAppDispatch()
    const [loginMutation, { data, isError, isLoading, isSuccess, status }] = useLoginMutation()

    const handleLogin = async () => {
        const result = await googleAuthentication()
        if (!result) return false
        const idToken = await result.user.getIdToken()
        const token = await loginMutation({ idToken: idToken }).unwrap()
        dispatch(authAction.updateState({ ...token }))
    }

    return {
        handleLogin,
        loginMutation,
        data,
        isError,
        isLoading,
        isSuccess,
        status,
    }
}
