import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import NumberInput from "../components/NumberInput/NumberInput";

const Salary: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<number>(0);
    const [thirdAnswer, setThirdAnswer] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [hoveredType, setHoveredType] = useState<string | null>(null);

    const choiceTypes = ['Официальная', 'Неофициальная', 'Комбинированная'];

    const descriptions: { [key: string]: string } = {
        "Официальная": "Белая зарплата, с налогами и отчислениями в пенсионный фонд.",
        "Неофициальная": "Серая зарплата, без официального оформления, без налогов.",
        "Комбинированная": "Часть официально, часть неофициально, часто используется для налоговой оптимизации."
    };

    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    const handleContinue = () => {
        if (firstAnswer) {

            updateAnswer('salary', `${firstAnswer}|${secondAnswer}`);
            if (firstAnswer === 'Комбинированная') {
                updateAnswer('salaryExtra', `${thirdAnswer}`);
            }
            navigate('/16');
        } else {
            setErrorMessage('Пожалуйста, заполните все поля.');
        }
        console.log(answers);
    };

    useEffect(() => {
        console.log(answers);
    }, []);

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">15. Укажите тип своей заработной платы</p>
                <div className="grid-container">
                    {choiceTypes.map((type) => (
                        <div
                            key={type}
                            className="card-wrapper"
                            onMouseEnter={() => setHoveredType(type)}
                            onMouseLeave={() => setHoveredType(null)}
                        >
                            <Card
                                isSelected={firstAnswer === type}
                                onClick={() => handleFirstChoice(type)}
                            >
                                {type}
                            </Card>
                            {hoveredType === type && (
                                <div className="tooltip">{descriptions[type]}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <div className="question">
                <p className="question-text" style={{ 'maxWidth': '350px' }}>Укажите размер всей заработной платы в рублях в месяц</p>
                <NumberInput
                    min={0}
                    max={9999999}
                    label={''}
                    value={secondAnswer}
                    setValue={setSecondAnswer}
                />
            </div>

            {firstAnswer === 'Комбинированная' &&
                <div className="question">
                    <p className="question-text" style={{ 'maxWidth': '350px' }}>Укажите часть, которая неофицальная</p>
                    <NumberInput
                        min={0}
                        max={9999999}
                        label={''}
                        value={thirdAnswer}
                        setValue={setThirdAnswer}
                    />
                </div>
            }

            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default Salary;
