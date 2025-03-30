import { Question } from "@/core/entities/question"
import { useModel } from "@/core/hooks"
import { logger } from "@/core/utils"
import { useEffect, useState } from "react"

const formatPrompt = (prompt: string) => {
    return `${prompt}.Short answer and your response following one question and four answers { "question": "your response", "question_translated": "your response by Vietnamese" , 
    [{"answer": "your response", "answer_translated": "your response by Vietnamese","is_correct": "true or false"}]}`
}

export const useQAndA = () => {
    const model = useModel()
    const [question, setQuestion] = useState<Question>({} as Question)
    const [step, setStep] = useState<number>(1)

    useEffect(() => {
        const prompt = "I need to learn grammar English. Can you ask me a question?"
        const handleFirstPrompt = async () => {
            try {
                // const response = await model.fetchApiModel(formatPrompt(prompt))
                const response: Question = {
                    question: "Which of the following sentences uses the correct subject-verb agreement?",
                    question_translated:
                        "Câu nào sau đây sử dụng sự hòa hợp giữa chủ ngữ và động từ một cách chính xác?",
                    answers: [
                        {
                            answer: "They was going to the store.",
                            answer_translated: "Họ đã đi đến cửa hàng.",
                            is_correct: "false",
                        },
                        {
                            answer: "She have a new car.",
                            answer_translated: "Cô ấy có một chiếc xe mới.",
                            is_correct: "false",
                        },
                        {
                            answer: "He do not like coffee.",
                            answer_translated: "Anh ấy không thích cà phê.",
                            is_correct: "false",
                        },
                        {
                            answer: "We are going to the park.",
                            answer_translated: "Chúng tôi đang đi đến công viên.",
                            is_correct: "true",
                        },
                    ],
                    explain: "This is a question about grammar.",
                }
                setQuestion(response)
                logger.object(response)
            } catch (error: any) {
                logger.error("fetchAPIGemini", error)
            }
        }
        handleFirstPrompt()
    }, [])
    return {
        step,
        question,
    }
}
