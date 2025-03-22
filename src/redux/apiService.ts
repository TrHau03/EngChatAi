import { RootState } from "@/core/hooks"
import { envApp } from "@/core/utils"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl: envApp.BASEURL,
    credentials: "include",
    timeout: 10000,
    prepareHeaders(headers, api) {
        headers.set("Content-Type", "application/json")
        headers.set("Accept", "application/json")
        headers.set("Authorization", `Bearer ${(api.getState() as RootState).root.auth.access_token}`)
        return headers
    },
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = retry(
    async (args, api, extraOptions) => {
        await mutex.waitForUnlock()
        let result = await baseQuery(args, api, extraOptions)
        if (result.error && result.error.status === 401) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire()
                try {
                    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)
                    if (refreshResult.data) {
                        result = await baseQuery(args, api, extraOptions)
                    } else {
                        //FIXME if refresh token is invalid
                    }
                } finally {
                    // release must be called once the mutex should be released again.
                    release()
                }
            } else {
                await mutex.waitForUnlock()
                result = await baseQuery(args, api, extraOptions)
            }
        }
        return result
    },
    {
        maxRetries: 3,
    },
)

export const apiService = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})
