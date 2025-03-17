import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../SurveyContext";
import Card from "../components/Card/Card";
import Error from "../components/Error/Error";
const Education: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const choiceTypes = ['Высшее', 'Среднее специальное', 'Среднее техническое', 'Основное общее']
    const navigate = useNavigate()
    const { updateAnswer } = useSurvey()

    const handleContinue = () => {
        if (firstAnswer) {
            updateAnswer('education', `${firstAnswer}`)
            navigate('/19')
        }
        else {
            setErrorMessage('Пожалуйста, заполните все поля.')
        }
    }

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Образование</p>
                <div className="grid-container" style={{ 'gridTemplateColumns': 'repeat(2, 1fr)' }}>
                    {choiceTypes.map((type) => (
                        <Card
                            key={type}
                            isSelected={firstAnswer === type}
                            onClick={() => setFirstAnswer(type)}
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

export default Education;
