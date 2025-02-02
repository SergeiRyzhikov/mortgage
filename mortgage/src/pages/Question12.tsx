import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Question12: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    const handleContinue = () => {
        if (firstAnswer) {
            updateAnswer('12', `${firstAnswer}`)
            navigate('/13')
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
                <p className="question-text">12. Сфера деятельности</p>
                <div className="grid-container">
                    <Card
                        isSelected={firstAnswer === "Учитель"}
                        onClick={() => handleFirstChoice("Учитель")}
                    >
                        Учитель
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Врач"}
                        onClick={() => handleFirstChoice("Врач")}
                    >
                        Врач
                    </Card>
                    <Card
                        isSelected={firstAnswer === "IT"}
                        onClick={() => handleFirstChoice("IT")}
                    >
                        IT
                    </Card>
                    <Card
                        isSelected={firstAnswer === "ИП"}
                        onClick={() => handleFirstChoice("ИП")}
                    >
                        ИП
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Государственная компания"}
                        onClick={() => handleFirstChoice("Государственная компания")}
                    >
                        Государственная компания
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Прочее"}
                        onClick={() => handleFirstChoice("Прочее")}
                    >
                        Прочее
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

export default Question12;
