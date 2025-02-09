import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Question12: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const choiceTypes = ['Учитель', 'Врач', 'IT', 'ИП', 'Государственная компания', 'Прочее']
    const choiceTypes2 = ['Да', 'Нет']
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
        if (answer !== "Нет") {
            setSecondAnswer(null);
            return
        }
    };

    const handleContinue = () => {
        if ((firstAnswer === "ИП" && !secondAnswer) || (!firstAnswer)) {
            setErrorMessage('Пожалуйста, заполните все поля.')
            return;
        }

        if (secondAnswer) {
            updateAnswer('12', `${firstAnswer}|${secondAnswer}`)
        }
        else {
            updateAnswer('12', `${firstAnswer}`)
        }
        navigate('/13')
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">12. Сфера деятельности</p>
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
            {firstAnswer === "ИП" && (
                <div className="question">
                    <p className="question-text">Есть ли справка по форме банка и 2-НДФЛ?</p>
                    <div className="grid-container">
                        {choiceTypes2.map((type) => (
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

export default Question12;
