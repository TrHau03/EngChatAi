import { apiService } from "@/redux/apiService";
import { GetTopicsResponse, GetWordByTopicResponse } from "./topicsType";

export class TopicsEndpoint {
  static getTopics = "/topics";
  static getWordByTopic(title: string) {
    return `/topics/${title}`;
  }
}

export const topicsService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<GetTopicsResponse, void>({
      query: () => ({
        url: TopicsEndpoint.getTopics,
      }),
    }),
    getWordByTopic: builder.query<GetWordByTopicResponse, string>({
      query: (title) => ({
        url: TopicsEndpoint.getWordByTopic(title),
      }),
    }),
  }),
  overrideExisting: true
})

export const { useGetTopicsQuery, useGetWordByTopicQuery } = topicsService

