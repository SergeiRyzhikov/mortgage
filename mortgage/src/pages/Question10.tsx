import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import NumberInput from "../components/NumberInput/NumberInput";

const Question9: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    const handleContinue = () => {
        if (firstAnswer) {
            updateAnswer('10', `${firstAnswer}|${secondAnswer}`);
            navigate('/11')
        }
        else {
            setErrorMessage('Пожалуйста, заполните все поля.')
        }
        console.log(answers)
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">10. Укажите свою заработную плату в рублях (тип и сумму)</p>
                <div className="grid-container" style={{ 'gridTemplateColumns': 'repeat(1, 1fr)' }}>
                    <Card
                        isSelected={firstAnswer === "Официальная"}
                        onClick={() => handleFirstChoice("Официальная")}
                    >
                        Официальная
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Неофицальная"}
                        onClick={() => handleFirstChoice("Неофицальная")}
                    >
                        Неофицальная
                    </Card>
                    <Card
                        isSelected={firstAnswer === "Комбинированная"}
                        onClick={() => handleFirstChoice("Комбинированная")}
                    >
                        Комбинированная
                    </Card>
                    <NumberInput
                        min={0}
                        max={9999999}
                        label={''}
                        value={secondAnswer}
                        setValue={setSecondAnswer}
                    />
                </div>
            </div>
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default Question9;
