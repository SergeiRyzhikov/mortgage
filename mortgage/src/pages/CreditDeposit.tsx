import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import NumberInput from "../components/NumberInput/NumberInput";
import { getMonthDeclension, getYearsDeclension } from "../utils";

const CreditDeposit: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [secondAnswer, setSecondAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [term, setTerm] = useState<number>(5);
    const [amount, setAmount] = useState<number>(1000000);
    // const [hasDeposit, setHasDeposit] = useState<boolean>(false)
    const choiceTypes = ['Да', 'Нет']

    const navigate = useNavigate();
    const { answers, updateAnswer, clearAnswers } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer)
        if (answer === "Нет") {
            setSecondAnswer(null)
            return
        }
    };

    const handleSecondChoice = (answer: string) => {
        setSecondAnswer(answer)

    };

    const handleContinue = () => {
        if ((firstAnswer === "Да" && !secondAnswer) || (!firstAnswer)) {
            setErrorMessage('Пожалуйста, заполните все поля.')
            return;
        }
        updateAnswer('hasDeposit', firstAnswer)
        if (firstAnswer === 'Нет') {
            navigate('/result')
            return
        }
        updateAnswer("amount", String(amount));
        updateAnswer('has50', `${secondAnswer}`)
        if (term > 12) {
            updateAnswer("term", String(term - 12));
            updateAnswer("isYears", 'да')
        }
        else {
            updateAnswer("term", String(term));
            updateAnswer("isYears", 'нет')
        }
        navigate("/salaryConf");
    };

    const getVisibleTerm = (term: number) => {
        return term > 12 ? term - 12 : term
    }

    function getWords(years: number): string {
        if (years <= 12) {
            return getMonthDeclension(years)
        }
        else {
            return getYearsDeclension(years - 12)
        }

    }
    const handleCarCredit = () => {
        clearAnswers()
        navigate('/1')

    }

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Имеется ли у вас квартира или дом?</p>
                <div className="grid-container">
                    {choiceTypes.map((type) => (
                        <Card
                            key={type}
                            isSelected={firstAnswer === type}
                            onClick={() => handleFirstChoice(type)}
                        >
                            {type}
                        </Card>
                    ))}
                </div>
            </div>

            {firstAnswer === "Да" &&
                <div className="form">
                    <label className="form-label">
                        Срок (максимум 15 лет):
                        <input
                            type="range"
                            value={term}
                            onChange={(e) => setTerm(Number(e.target.value))}
                            className="form-slider"
                            min="1"
                            max={27}
                        />
                        <span className="slider-value">{getVisibleTerm(term)} {getWords(term)}</span>
                    </label>
                    <NumberInput
                        min={0}
                        max={100000000}
                        label={"Сумма кредита:"}
                        value={amount}
                        setValue={setAmount}

                    />
                    <div className="question">
                        <p className="question-text" style={{ 'fontSize': '1rem' }}>Первоначальный взнос кредита составляет 50% от оценочной стоимости дома или квартиры. Имеется ли у вас имущество, подходящее под этот критерий?
                        </p>
                        <div className="grid-container">
                            {choiceTypes.map((type) => (
                                <Card
                                    key={type}
                                    isSelected={secondAnswer === type}
                                    onClick={() => handleSecondChoice(type)}
                                >
                                    {type}
                                </Card>
                            ))}
                        </div>
                        {/* <hr style={{ 'textAlign': "center", 'width': '400px', 'color':'black' }} /> */}
                    </div>

                    {secondAnswer === "Нет" &&
                        <div className="question">
                            <p className="question-text" style={{ 'fontSize': '1rem' }}>Уменьшите сумму кредита или проверьте возможность взять кредит под залог автомобиля</p>
                            <div className="grid-container">
                                <button onClick={handleCarCredit} className="button2">
                                    Кредит под залог автомобиля
                                </button>
                                <button onClick={handleContinue} className="button2">
                                    Продолжить
                                </button>
                            </div></div>
                    }
                </div>

            }

            <Error message={errorMessage} setMessage={setErrorMessage} />
            {secondAnswer !== "Нет" &&
                < button onClick={handleContinue} className="button">
                    Продолжить
                </button>
            }
        </div >
    );
};
// Тут два варианта предлагается пользователю: 1. Уменьшить сумму кредита (крутит ползунок заново) 

export default CreditDeposit;
