import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/NumberInput/NumberInput";

const Extra2: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<number>(0);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleContinue = () => {
        updateAnswer('доп2', `${firstAnswer}`)
        navigate('/extra3')
        console.log(answers)
    };

    useEffect(() => {
        const typeOfCredits = JSON.parse(answers['доп1'])
        console.log(typeOfCredits)
        if (!typeOfCredits.includes('Кредитная карта')) {
            // console.log('nav')
            updateAnswer('доп2', `0`)
            updateAnswer('доп3', `[0]`)
            
            navigate('/extra3_1')
        }
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Сколько кредитных карт?</p>
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

export default Extra2;
