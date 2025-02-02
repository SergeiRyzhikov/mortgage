import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";

const Question6: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string>("2005-10-10");
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleContinue = () => {
        console.log(firstAnswer)
        updateAnswer('6', `${firstAnswer}`)
        navigate('/7')

        console.log(answers)
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">6. Введите свою дату рождения</p>
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

export default Question6;
