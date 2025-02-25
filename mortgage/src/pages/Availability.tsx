import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const Availability: React.FC = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const choiceTypes = ['Автомобиль', 'Квартира/Дом', 'Земельный участок', 'Ничего']

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
            updateAnswer('availability', JSON.stringify(selectedAnswers))
            navigate('/result');
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
                <p className="question-text">19. Наличие</p>
                <div className="grid-container">
                    {choiceTypes.map((type) => (
                        <Card
                            key={type}
                            isSelected={selectedAnswers.includes(type)}
                            onClick={() => handleChoice(type)}
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

export default Availability;
