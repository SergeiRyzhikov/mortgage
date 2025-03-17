import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput/NumberInput";

const Extra3_1: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<number>(0);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleContinue = () => {
        if (firstAnswer == 0) {
            updateAnswer('доп31', `0`)
            navigate('/extra5')
            return
        }
        updateAnswer('доп31', `${firstAnswer}`)
        navigate('/extra4')
        console.log(answers)
    };

    useEffect(() => {
        const typeOfCredits = JSON.parse(answers['доп1'])
        console.log(typeOfCredits)
        if (!(typeOfCredits.includes('Ипотека') || typeOfCredits.includes('Потребительский кредит'))) {
            updateAnswer('доп31', `0`)
            updateAnswer("доп4", JSON.stringify([0]));
            navigate('/extra5')
        }
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Сколько действующих кредитов?</p>
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

export default Extra3_1;
