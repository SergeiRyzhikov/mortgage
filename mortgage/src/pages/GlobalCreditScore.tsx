import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const GlobalCreditScore: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();
    const choiceTypes = ['Загрузить PDF с кредитной историей', 'Ввести самостоятельно', 'Пропустить']
    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    const handleContinue = () => {
        if (firstAnswer) {
            if (firstAnswer === 'Загрузить PDF с кредитной историей') {
                navigate('/pdf')
                return
            }
            if (firstAnswer === 'Ввести самостоятельно') {
                navigate('/creditScore')
                return
            }
            if (firstAnswer === 'Пропустить') {
                updateAnswer('creditScore', '0')
                navigate('/extra1')
                return
            }
        }
        else {
            setErrorMessage('Пожалуйста, заполните все поля.')
        }
        console.log(answers)
    };

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">7. Кредитный рейтинг</p>
                <div className="grid-container">
                    {choiceTypes.map((type) => (
                        <Card
                            key={type}
                            isSelected={firstAnswer === type}
                            onClick={() => handleFirstChoice(type)}
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

export default GlobalCreditScore;


