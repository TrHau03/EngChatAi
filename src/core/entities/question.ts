export interface Question {
    question: string
    question_translated: string
    answers: Answer[]
    explain: string
}

export interface Answer {
    answer: string
    answer_translated: string
    is_correct: string
}
