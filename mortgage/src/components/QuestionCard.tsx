import React, { useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

type QuestionCardProps = {
    choiceTypes: string[],
    questionText: string,
    answerId: string,
    navigatePath: string,
};
const QuestionCard: React.FC<QuestionCardProps> = ({choiceTypes, questionText, answerId, navigatePath}) => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const navigate = useNavigate()
    const { updateAnswer } = useSurvey()

    const handleContinue = () => {
        if (firstAnswer) {
            updateAnswer(answerId, `${firstAnswer}`)
            navigate(navigatePath)
        }
        else {
            setErrorMessage('Пожалуйста, заполните все поля.')
        }
    }

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">{questionText}</p>
                <div className="grid-container">
                    {choiceTypes.map((type) => (
                        <Card
                            key={type}
                            isSelected={firstAnswer === type}
                            onClick={() => setFirstAnswer(type)}
                        >
                            {type}
                        </Card>
                    ))}
                </div>
            </div>
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default QuestionCard;
