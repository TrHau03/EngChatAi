export interface Word {
    _id: string
    word: string
    part_of_speech: string
    level: string
    pronunciation: {
        uk: string
        us: string
    }
}
