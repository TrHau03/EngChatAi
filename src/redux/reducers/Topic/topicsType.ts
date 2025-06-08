export interface Topic {
  _id: string;
  title: string;
  image: string;
}

export interface WordByTopic {
  _id: string;
  word: string;
  part_of_speech: string;
  topic: string;
  pronunciation: {
    uk: string;
    us: string;
  };
}

export type GetWordByTopicResponse = WordByTopic[];
export type GetTopicsResponse = Topic[];
