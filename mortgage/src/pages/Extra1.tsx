import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Extra1: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    const handleContinue = () => {
        if (firstAnswer) {
            updateAnswer('доп1', `${firstAnswer}`)
            navigate('/extra2')
        }
        else {
            setErrorMessage('Пожалуйста, заполните все поля.')
        }
        console.log(answers)
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">4.1. Что брали из действующих кредитов?</p>
                <div className="grid-container">
                    <Card
                        isSelected={firstAnswer === "Потребительский кредит"}
                        onClick={() => handleFirstChoice("Потребительский кредит")}
                    >
                        Потребительский кредит
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Ипотека"}
                        onClick={() => handleFirstChoice("Ипотека")}
                    >
                        Ипотека
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Кредитная карта"}
                        onClick={() => handleFirstChoice("Кредитная карта")}
                    >
                        Кредитная карта
                    </Card>
                </div>
            </div>
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default Extra1;
