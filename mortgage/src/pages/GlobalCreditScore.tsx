import React, { useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const GlobalCreditScore: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();
    const [hoveredType, setHoveredType] = useState<string | null>(null);
    const choiceTypes = ['Загрузить PDF с кредитной историей', 'Ввести кредитный рейтинг самостоятельно', 'Пропустить']
    const descriptions: { [key: string]: string } = {
        "Загрузить PDF с кредитной историей": "",
        'Ввести кредитный рейтинг самостоятельно': "Результат будет менее точным.",
        "Пропустить": "Результат будет приблизительным и неточным."
    };
    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
    };


    const handleContinue = () => {
        if (firstAnswer) {
            if (firstAnswer === 'Загрузить PDF с кредитной историей') {
                navigate('/pdf')
                return
            }
            if (firstAnswer === 'Ввести кредитный рейтинг самостоятельно') {
                navigate('/creditScore')
                return
            }
            if (firstAnswer === 'Пропустить') {
                updateAnswer('creditScore', '0')
                navigate('/extra1')
                return
            }
        }
        else {
            setErrorMessage('Пожалуйста, заполните все поля.')
        }
        console.log(answers)
    };

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Кредитный рейтинг</p>
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
                            {hoveredType === type && type !== choiceTypes[0] && (
                                <div className="tooltip">{descriptions[type]}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {
                (firstAnswer === choiceTypes[1] || firstAnswer === choiceTypes[2]) &&
                <div className="recommendation-box" style={{ 'marginTop': '50px' }}>
                    <h2>Причины проверить кредитную историю</h2>
                    <p>
                        3 главных вопроса о кредитной истории.
                    </p>
                    <p>Кредитная история — это информация о ваших кредитных обязательствах. Она показывает, в какие банки или микрофинансовые организации вы обращались за кредитами и займами, когда это было и какие суммы вы брали.</p>
                    <p>
                        1️⃣ Как часто обновляется КИ? <br></br>Кредиторы обязаны обновлять данные в БКИ в течение 5 рабочих дней.
                    </p>
                    <p>2️⃣ Почему у меня плохая КИ, если я всё выплачивал? <br></br>Возможные причины: данные еще не обновились, не закрыта кредитная карта, остался незамеченный долг, ошибка банка или бюро. </p>
                    <p>3️⃣ Что делать с плохой КИ? <br></br>Улучшайте её, беря небольшие кредиты и вовремя их погашая.</p>
                </div>
            }
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default GlobalCreditScore;


