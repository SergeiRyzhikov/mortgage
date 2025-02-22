import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Extra1: React.FC = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const navigate = useNavigate()
    const { answers, updateAnswer } = useSurvey()

    const handleChoice = (answer: string) => {
        setSelectedAnswers(prevAnswers => {
            if (prevAnswers.includes(answer)) {
                return prevAnswers.filter(a => a !== answer);
            } else {
                return [...prevAnswers, answer];
            }
        });
    };

    const handleContinue = () => {
        if (selectedAnswers.length > 0) {
            updateAnswer('доп1', JSON.stringify(selectedAnswers))
            navigate('/extra2');
        } else {
            setErrorMessage('Пожалуйста, выберите хотя бы один вариант.');
        }
        console.log(answers);
    };

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">4.1. Что брали из действующих кредитов?</p>
                <div className="grid-container">
                    <Card
                        isSelected={selectedAnswers.includes("Потребительский кредит")}
                        onClick={() => handleChoice("Потребительский кредит")}
                    >
                        Потребительский кредит
                    </Card>
                    <Card
                        isSelected={selectedAnswers.includes("Ипотека")}
                        onClick={() => handleChoice("Ипотека")}
                    >
                        Ипотека
                    </Card>
                    <Card
                        isSelected={selectedAnswers.includes("Кредитная карта")}
                        onClick={() => handleChoice("Кредитная карта")}
                    >
                        Кредитная карта
                    </Card>
                    <Card
                        isSelected={selectedAnswers.includes("Ничего")}
                        onClick={() => handleChoice("Ничего")}
                    >
                        Ничего
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
