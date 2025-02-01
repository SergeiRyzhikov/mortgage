import React, { useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import NumberInput from "./NumberInput/NumberInput";

const MortgageSelection: React.FC = () => {
    const [selectedMortgage, setSelectedMortgage] = useState<string | null>(null);
    const [term, setTerm] = useState<number>(10);
    const [amount, setAmount] = useState<number>(1000000);
    const [initialPayment, setInitialPayment] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { answers, updateAnswer } = useSurvey();
    const navigate = useNavigate();

    const mortgageTypes = [
        { type: "Дальневосточная", details: "Максимум на 20 лет, с 21 до 65 лет, семья (учителя, врачи, IT до 36 лет), 2% годовых", maxTerm: 20 },
        { type: "Сельская", details: "Максимум на 25 лет, 3% годовых, с 21 до 65 лет", maxTerm: 25 },
        { type: "IT", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет, аккредитованная компания", maxTerm: 20 },
        { type: "Арктическая", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет", maxTerm: 20 },
        { type: "Семейная", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет, 1 ребенок (2019+ года рождения) или 2 ребенка меньше 18 лет", maxTerm: 20 },
        { type: "Нельготная", details: "Максимум на 30 лет, людям с 20 до 65 лет, около 24% годовых", maxTerm: 30 },
    ];

    const handleSelectMortgage = (type: string) => {
        setSelectedMortgage(type);
        // setTerm("");
        setErrorMessage(null);
    };

    const handleContinue = () => {
        if (!selectedMortgage || !term || !amount || !initialPayment) {
            console.log('не все заполнено')
            setErrorMessage("Пожалуйста, заполните все поля.");
            return;
        }

        if (initialPayment < amount * 0.15) {
            setErrorMessage("Первоначальный взнос должен быть не менее 15% от суммы кредита.");
            return;
        }

        setErrorMessage(null);
        console.log("Selected Mortgage:", selectedMortgage);
        console.log("Term:", term);
        console.log("Amount:", amount);
        console.log("Initial Payment:", initialPayment);
        updateAnswer('type', selectedMortgage)
        updateAnswer('term', String(term))
        updateAnswer('amount', String(amount))
        updateAnswer('initial_payment', String(initialPayment))
        navigate('/1')
    };

    const getMaxTerm = () => {
        const selected = mortgageTypes.find((mortgage) => mortgage.type === selectedMortgage);
        return selected ? selected.maxTerm : 0;
    };

    return (
        <div className="container">
            <h1 className="title">Выберите вид ипотеки</h1>
            <div className="grid-container">
                {mortgageTypes.map(({ type, details }) => (
                    <Card
                        key={type}
                        isSelected={selectedMortgage === type}
                        onClick={() => handleSelectMortgage(type)}
                    >
                        <p className="card-text">{type}</p>
                        <p className="card-details">{details}</p>
                    </Card>
                ))}
            </div>

            {selectedMortgage && (
                <div className="form">
                    <label className="form-label">
                        Срок (лет, максимум {getMaxTerm()}):
                        <input
                            type="range"
                            value={term}
                            onChange={(e) => setTerm(Number(e.target.value))}
                            className="form-slider"
                            min="1"
                            max={getMaxTerm()}
                        />
                        <span className="slider-value">{term} лет</span>
                    </label>
                    <NumberInput
                        min={0}
                        max={100000000}
                        label={'Сумма ипотеки:'}
                        value={amount}
                        setValue={setAmount}
                    />
                    <NumberInput
                        min={0}
                        max={amount}
                        label={'Первоначальный взнос (не менее 15%):'}
                        value={initialPayment}
                        setValue={setInitialPayment}
                    />
                </div>
            )}
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default MortgageSelection;
