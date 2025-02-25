import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Extra8: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
        if (answer === "Нет") {
            setSecondAnswer(null);
            return
        }

    };

    const handleContinue = () => {
        if ((firstAnswer === "Да" && !secondAnswer) || (!firstAnswer)) {
            setErrorMessage('Пожалуйста, заполните все поля.')
            return;
        }
        if (secondAnswer) {
            if (secondAnswer === "Нет") updateAnswer('доп8', `-`)
            else updateAnswer('доп8', `+`)
        }
        else {
            updateAnswer('доп8', `+`)
        }
        navigate('/10')

    };
    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">4.8. Были ли просрочки?</p>
                <div className="grid-container">
                    <Card
                        isSelected={firstAnswer === "Да"}
                        onClick={() => handleFirstChoice("Да")}
                    >
                        Да
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Нет"}
                        onClick={() => handleFirstChoice("Нет")}
                    >
                        Нет
                    </Card>
                </div>
            </div>

            {firstAnswer === "Да" && (
                <div className="question">
                    <p className="question-text">С последней просрочки прошло три платежа?</p>
                    <div className="grid-container">
                        <Card
                            isSelected={secondAnswer === "Да"}
                            onClick={() => setSecondAnswer("Да")}
                        >
                            Да
                        </Card>
                        <Card
                            isSelected={secondAnswer === "Нет"}
                            onClick={() => setSecondAnswer("Нет")}
                        >
                            Нет
                        </Card>
                    </div>
                </div>
            )}
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default Extra8;
