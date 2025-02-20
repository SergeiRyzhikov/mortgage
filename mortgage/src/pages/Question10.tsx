import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import NumberInput from "../components/NumberInput/NumberInput";

const Question9: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<number>(0);
    // const [thirdAnswer, setThirdAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const choiceTypes = ['Официальная', 'Неофицальная', 'Комбинированная']
    // const choiceTypes2 = ['Да', 'Нет']

    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };

    // const handleContinue = () => {
    //     if ((!firstAnswer) || (firstAnswer === "Неофицальная" && !thirdAnswer)) {
    //         setErrorMessage('Пожалуйста, заполните все поля.')
    //         return
    //     }

    //     if (firstAnswer !== 'Неофицальная') {
    //         updateAnswer('10', `${firstAnswer}|${secondAnswer}`);
    //         navigate('/11')
    //     }
    //     else {
    //         updateAnswer('10', `${firstAnswer}|${secondAnswer}|${thirdAnswer}`);
    //         navigate('/11')
    //     }
    //     console.log(answers)
    // };
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
                <p className="question-text">10. Укажите тип своей заработной платы</p>
                <div className="grid-container" >
                    {choiceTypes.map((type) => (
                        <Card
                            key={type}
                            isSelected={firstAnswer === type}
                            onClick={() => handleFirstChoice(type)}
                        >
                            {type}
                        </Card>
                    ))}
                    {/* {firstAnswer === "Неофицальная" && (
                        <div className="question">
                            <p className="question-text">Есть ли справка по форме банка?</p>
                            <div className="grid-container">
                                {choiceTypes2.map((type) => (
                                    <Card
                                        key={type}
                                        isSelected={thirdAnswer === type}
                                        onClick={() => setThirdAnswer(type)}
                                    >
                                        {type}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )} */}

                </div>
            </div>
            <p className="question-text">Укажите размер заработной платы в рублях в месяц </p>
            <div className="question">
                <NumberInput
                    min={0}
                    max={9999999}
                    label={''}
                    value={secondAnswer}
                    setValue={setSecondAnswer}
                />
            </div>
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default Question9;
