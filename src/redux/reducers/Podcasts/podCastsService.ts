import { apiService } from "@/redux/apiService"
import { GetPodCastsResponse, PodcastItemData } from "./podCastsType"


export class PodCastsEndpoint {
    static getPodCasts = "/podcasts/getpodcasts"
    static getPodCastById(id: string) {
        return `/podcasts/getpodcasts/${id}`
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
    overrideExisting: false,
})

export const { useGetPodCastsQuery, useGetPodCastByIdQuery } = podCastsService