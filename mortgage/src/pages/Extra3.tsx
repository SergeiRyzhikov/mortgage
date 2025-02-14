import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput/NumberInput";
import "../styles/Extra3.css";

const Extra3: React.FC = () => {
    const [limits, setLimits] = useState<number[]>([0]); // Начальный один инпут
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    // Добавить новый инпут
    const handleAddInput = () => {
        setLimits([...limits, 0]);
    };

    // Обновить значение конкретного инпута
    const handleLimitChange = (index: number, value: number) => {
        setLimits((prev) => {
            const updatedLimits = [...prev];
            updatedLimits[index] = value;
            return updatedLimits;
        });
    };

    // Удаление инпута (если больше 1)
    const handleRemoveInput = (index: number) => {
        if (limits.length > 1) {
            setLimits((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const handleContinue = () => {
        updateAnswer("доп3", JSON.stringify(limits)); // Сохраняем список лимитов
        navigate("/extra4");
        console.log(answers);
    };

    useEffect(() => {
        console.log(answers);
    }, []);

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question" style={{'width':'auto'}}>
                <p className="question-text">4.3. Какие лимиты по картам?</p>
                <div className="input-list">
                    {limits.map((limit, index) => (
                        <div key={index} className="input-wrapper">
                            <NumberInput
                                min={0}
                                max={99999999}
                                label={``}
                                value={limit}
                                setValue={(value) => handleLimitChange(index, value as number)}
                            />
                            {limits.length > 1 && (
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveInput(index)}
                                >
                                    ✖
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button className="add-button" onClick={handleAddInput}>
                    + Добавить карту
                </button>
            </div>

            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default Extra3;
