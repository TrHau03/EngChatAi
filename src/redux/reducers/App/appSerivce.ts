import { apiService } from "@/redux/apiService"

interface LoginRequest {
    idToken: string
}

export class AppEndPoint {
    static login = "/auth/login"
}

export const appService = apiService.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: AppEndPoint.login,
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useLoginMutation } = appService
