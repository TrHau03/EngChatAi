import { googleAuthentication } from "@/core/func"
import { useLoginMutation } from "@/redux/reducers/App/appSerivce"

export const useSignIn = () => {
    const [loginMutation, { data, isError, isLoading, isSuccess, status }] = useLoginMutation()

    const handleLogin = async () => {
        const result = await googleAuthentication()
        if (!result) return false
        const idToken = await result.user.getIdToken()
        await loginMutation({ idToken: idToken }).unwrap()
        return true
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
