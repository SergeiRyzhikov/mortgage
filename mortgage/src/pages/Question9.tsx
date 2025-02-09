import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Question9: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const choiceTypes = ['Да', 'Нет']
    
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();
    
    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
        if (answer === "Да") {
            setSecondAnswer(null);
            return
        }
    };

    const handleContinue = () => {
        if ((firstAnswer === "Нет" && !secondAnswer) || (!firstAnswer)) {
            setErrorMessage('Пожалуйста, заполните все поля.')
            return;
        }

        if (secondAnswer) {
            updateAnswer('9', `${firstAnswer}|${secondAnswer}`)
        }
        else {
            updateAnswer('9', `${firstAnswer}`)
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
                <p className="question-text">9. Являетесь ли резидентом РФ?</p>
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
            {firstAnswer === "Нет" && (
                <div className="question">
                    <p className="question-text">Есть ли регистрация на территории РФ и вид на жительство?</p>
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

export default Question9;
