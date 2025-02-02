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
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">4.2. Сколько кредитных карт?</p>
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


// Что брали из действующих кредитов?
// Потребительский кредит
// Ипотека
// Кредитная карта
// Сколько кредитных карт?
// Какие лимиты по картам?
// Какие платежи по кредитам?
// Брали ли когда-то кредиты и ипотеки? (Если да, то это хорошо)
// Были ли отказы? (Каждый отказ снижает кредитный рейтинг. Если были отказы, то шансы невысокие)
// Когда в последний раз брали кредит или ипотеку? (Должна быть разница в 6 месяцев)
// Есть ли просрочки? (Должно пройти больше 6 месяцев с последней просрочки)