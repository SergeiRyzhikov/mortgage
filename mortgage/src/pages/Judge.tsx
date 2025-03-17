import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Judge: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const choiceTypes = ['Да', 'Нет']

    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer)
        if (answer === "Нет") {
            setSecondAnswer(null)
            return
        }

    };

    const handleContinue = () => {
        if ((firstAnswer === "Да" && !secondAnswer) || (!firstAnswer)) {
            setErrorMessage('Пожалуйста, заполните все поля.')
            return;
        }

        if (secondAnswer) {
            updateAnswer('judge', `${firstAnswer}|${secondAnswer}`)
        }
        else {
            updateAnswer('judge', `${firstAnswer}`)
        }
        navigate('/5', { state: { from: '1' } })
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Есть ли у Вас судимость?</p>
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

            {firstAnswer === "Да" && (
                <div className="question">
                    <p className="question-text">По экономической статье?</p>
                    <div className="grid-container">
                        {choiceTypes.map((type) => (
                            <Card
                                key={type}
                                isSelected={secondAnswer === type}
                                onClick={() => setSecondAnswer(type)}
                            >
                                {type}
                            </Card>
                        ))}
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

export default Judge;
