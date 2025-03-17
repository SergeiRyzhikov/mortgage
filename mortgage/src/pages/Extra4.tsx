import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput/NumberInput";
// import "../styles/Extra3.css";

const Extra4: React.FC = () => {
    const [limits, setLimits] = useState<number[]>([]);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    useEffect(() => {
        const cardCount = Number(answers['доп31']) || 1;
        setLimits(new Array(cardCount).fill(0));
    }, [answers]);

    const handleLimitChange = (index: number, value: number) => {
        setLimits((prev) => {
            const updatedLimits = [...prev];
            updatedLimits[index] = value;
            return updatedLimits;
        });
    };

    const handleContinue = () => {
        updateAnswer("доп4", JSON.stringify(limits));
        navigate("/extra5");
        console.log(answers);
    };

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question" style={{ width: 'auto' }}>
                <p className="question-text">Какие платежи по кредитам?</p>
                <div className="input-list">
                    {limits.map((limit, index) => (
                        <div key={index} className="input-wrapper">
                            <NumberInput
                                min={0}
                                max={99999999}
                                label={''}
                                value={limit}
                                setValue={(value) => handleLimitChange(index, value as number)}
                                // suffix={'р'}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default Extra4;
