import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";

const DateBirth: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string>("2005-10-10");
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleContinue = () => {
        console.log(firstAnswer)
        updateAnswer('dateBirth', `${firstAnswer}`)
        navigate('/11')

        console.log(answers)
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Введите дату своего рождения</p>
                <div className="grid-container">
                    <input
                        type="date"
                        name="trip-start"
                        value={firstAnswer}
                        min="1900-01-01"
                        max="2024-12-31"
                        className="date-input"
                        onChange={(e) => setFirstAnswer(e.target.value)}
                    />

                </div>
            </div>
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default DateBirth;
