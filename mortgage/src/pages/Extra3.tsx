import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput/NumberInput";
// import "../styles/Extra3.css";

const Extra3: React.FC = () => {
    const [limits, setLimits] = useState<number[]>([]);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    useEffect(() => {
        const cardCount = Number(answers['доп2']) || 1;
        setLimits(new Array(cardCount).fill(0));
    }, [answers]);

    // Обновить значение конкретного инпута
    const handleLimitChange = (index: number, value: number) => {
        setLimits((prev) => {
            const updatedLimits = [...prev];
            updatedLimits[index] = value;
            return updatedLimits;
        });
    };

    const handleContinue = () => {
        updateAnswer("доп3", JSON.stringify(limits));
        navigate("/extra3_1");
        console.log(answers);
    };

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question" style={{ width: 'auto' }}>
                <p className="question-text">4.3. Какие лимиты по картам?</p>
                <div className="input-list">
                    {limits.map((limit, index) => (
                        <div key={index} className="input-wrapper">
                            <NumberInput
                                min={0}
                                max={99999999}
                                label={''}
                                value={limit}
                                setValue={(value) => handleLimitChange(index, value as number)}
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

export default Extra3;
