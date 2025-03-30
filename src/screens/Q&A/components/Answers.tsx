import { Answer as AnswerEntity } from "@/core/entities/question"
import { makeStyles } from "@rneui/themed"
import React, { useCallback, useState } from "react"
import { default as Answer } from "./Answer"

interface AnswerProps {
    answers: AnswerEntity[]
}

const position: Record<number, string> = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
}

const Answers: React.FC<AnswerProps> = (props) => {
    const isSelected = false
    const styles = useStyles({})
    const [questionSelected, setQuestionSelected] = useState<string | null>(null)

    const handleSelected = useCallback((id: string) => {
        setQuestionSelected(id)
    }, [])

    return props?.answers?.map((answer, index: number) => (
        <Answer
            key={index}
            answer={answer.answer}
            isCorrected={answer.is_correct === "true" ? true : false}
            answer_translated={answer.answer_translated}
            position={position[index]}
            isSelected={questionSelected === position[index]}
            handleSelected={handleSelected}
        />
    ))
}

export default Answers

const useStyles = makeStyles(({ colors }, data: any) => {
    const { isSelected, isCorrect } = data
    return {}
})
