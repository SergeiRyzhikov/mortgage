import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";

const ChildrenBirth: React.FC = () => {
    // const [firstAnswer, setFirstAnswer] = useState<string>("2005-10-10");
    const [firstAnswer, setFirstAnswer] = useState<Array<string>>([])
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();


    const handleContinue = () => {
        console.log(firstAnswer)
        updateAnswer('childrenBirth', `${firstAnswer}`)
        navigate('/14')

        console.log(answers)
    };

    useEffect(() => {
        const numberOfChildren = Number(answers['amountChildren'])
        // const numberOfChildren = 10
        if (numberOfChildren === 0) {
            updateAnswer('childrenBirth', `0`)
            navigate('/14')
        }
        const newAr = []
        for (let i = 0; i < numberOfChildren; i++) {
            newAr.push('2005-10-10')
        }
        setFirstAnswer(newAr)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">13. Введите даты рождения всех детей</p>
                <div className="grid-container" style={{ 'gridTemplateColumns': 'repeat(1, 1fr)' }}>
                    {firstAnswer.map((i, index) =>
                        <input
                            key={index}
                            type="date"
                            name="trip-start"
                            value={i}
                            min="1900-01-01"
                            max="2025-12-31"
                            className="date-input"
                            onChange={(e) => {
                                const newAr = firstAnswer.slice()
                                newAr[index] = e.target.value
                                setFirstAnswer(newAr)
                            }}
                        />
                    )}


                </div>
            </div>
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default ChildrenBirth;
