import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput/NumberInput";

const AmountDependents: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<number>(0);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleContinue = () => {
        updateAnswer('dependents', `${firstAnswer}`)
        navigate('/15')
        console.log(answers)
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Количество иждивенцев, кроме детей</p>
                <div className="grid-container">
                    <NumberInput
                        min={0}
                        max={99}
                        label={''}
                        value={firstAnswer}
                        setValue={setFirstAnswer}
                    />
                </div>
            </div>
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default AmountDependents;