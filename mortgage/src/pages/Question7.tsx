import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Question7: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    const handleContinue = () => {
        if (firstAnswer) {
            updateAnswer('7', `${firstAnswer}`)
            navigate('/8')
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
                <p className="question-text">7. Ваше семейное положение</p>
                <div className="grid-container">
                    <Card
                        isSelected={firstAnswer === "В браке"}
                        onClick={() => handleFirstChoice("В браке")}
                    >
                        В браке
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Один"}
                        onClick={() => handleFirstChoice("Один")}
                    >
                        Один
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

export default Question7;
