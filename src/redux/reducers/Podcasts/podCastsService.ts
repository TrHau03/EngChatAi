import { apiService } from "@/redux/apiService"
import { GetPodCastsResponse, PodcastItemData } from "./podCastsType"

export class PodCastsEndpoint {
    static getPodCasts = "/podcasts"
    static getPodCastById(id: string) {
        return `/podcasts/${id}`
    }
}

export const podCastsService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getPodCasts: builder.query<GetPodCastsResponse, void>({
            query: () => ({
                url: PodCastsEndpoint.getPodCasts,
            }),
        }),
        getPodCastById: builder.query<PodcastItemData, string>({
            query: (id) => ({
                url: PodCastsEndpoint.getPodCastById(id),
            }),
        }),
    }),
    overrideExisting: true,
})

export const { useGetPodCastsQuery, useGetPodCastByIdQuery } = podCastsService