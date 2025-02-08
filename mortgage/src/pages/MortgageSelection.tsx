import React, { useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import NumberInput from "../components/NumberInput/NumberInput";
import { mortgageTypes } from "../utils";

const MortgageSelection: React.FC = () => {
    const [selectedCreditType, setSelectedCreditType] = useState<string | null>(null);
    const [selectedMortgage, setSelectedMortgage] = useState<string | null>(null);
    const [term, setTerm] = useState<number>(10);
    const [amount, setAmount] = useState<number>(1000000);
    const [initialPayment, setInitialPayment] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { answers, updateAnswer } = useSurvey();
    const navigate = useNavigate();

    const creditTypes = ["Ипотека", "Потребительский кредит", "Автокредит", "Микрозайм"];

    const handleSelectCreditType = (type: string) => {
        setSelectedCreditType(type);
        setSelectedMortgage(null);
        setErrorMessage(null);
    };

    const handleSelectMortgage = (type: string) => {
        setSelectedMortgage(type);
        setErrorMessage(null);
    };

    const handleContinue = () => {
        if (!selectedCreditType || (selectedCreditType === "Ипотека" && !selectedMortgage) || !term || !amount || !initialPayment) {
            setErrorMessage("Пожалуйста, заполните все поля.");
            return;
        }

        if (initialPayment < amount * 0.15) {
            setErrorMessage("Первоначальный взнос должен быть не менее 15% от суммы кредита.");
            return;
        }

        setErrorMessage(null);
        console.log("Selected Credit Type:", selectedCreditType);
        console.log("Selected Mortgage:", selectedMortgage);
        console.log("Term:", term);
        console.log("Amount:", amount);
        console.log("Initial Payment:", initialPayment);

        updateAnswer("credit_type", selectedCreditType);
        if (selectedCreditType === "Ипотека") {
            updateAnswer("mortgage_type", selectedMortgage!);
        }
        updateAnswer("term", String(term));
        updateAnswer("amount", String(amount));
        updateAnswer("initial_payment", String(initialPayment));

        const selected = mortgageTypes.find((mortgage) => mortgage.type === selectedMortgage);
        updateAnswer('procent', String(selected?.procent))

        navigate("/14");
    };

    const getMaxTerm = () => {
        if (selectedCreditType !== "Ипотека") return 30;
        const selected = mortgageTypes.find((mortgage) => mortgage.type === selectedMortgage);
        return selected ? selected.maxTerm : 0;
    };

    return (
        <div className="container">
            <p className="question-text">13. Выберите тип кредита</p>
            <div className="grid-container" style={{ 'gridTemplateColumns': 'repeat(2, 1fr)' }}>
                {creditTypes.map((type) => (
                    <Card
                        key={type}
                        isSelected={selectedCreditType === type}
                        onClick={() => handleSelectCreditType(type)}
                    >
                        {type}
                    </Card>
                ))}
            </div>

            {selectedCreditType === "Ипотека" && (
                <>
                    <p className="question-text">Выберите вид ипотеки</p>
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
                </>
            )}

            {(selectedMortgage || (selectedCreditType && selectedCreditType !== 'Ипотека')) &&
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
                        label={"Сумма кредита:"}
                        value={amount}
                        setValue={setAmount}
                    />
                    <NumberInput
                        min={0}
                        max={amount}
                        label={"Первоначальный взнос (не менее 15%):"}
                        value={initialPayment}
                        setValue={setInitialPayment}
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

export default MortgageSelection;
