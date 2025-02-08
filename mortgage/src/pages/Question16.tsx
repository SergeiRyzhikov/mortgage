import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Question16: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const choiceTypes = ['Автомобиль', 'Квартира/Дом', 'Земельный участок']
    
    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    const handleContinue = () => {
        if (firstAnswer) {
            updateAnswer('16', `${firstAnswer}`)
            navigate('/17')
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
                <p className="question-text">16. Наличие</p>
                <div className="grid-container" style={{ 'gridTemplateColumns': 'repeat(1, 1fr)' }}>
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

export default Question16;
