import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000,
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery("/refreshToken", api, extraOptions)
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
}

export const apiService = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})
