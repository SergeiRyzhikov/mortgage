import React, { useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import NumberInput from "../components/NumberInput/NumberInput";
import { getMonthDeclension, getYearsDeclension, mortgageTypes } from "../utils";

const MortgageSelection: React.FC = () => {
    const [selectedCreditType, setSelectedCreditType] = useState<string | null>(null);
    const [selectedMortgage, setSelectedMortgage] = useState<string | null>(null);
    const [term, setTerm] = useState<number>(5);
    const [amount, setAmount] = useState<number>(1000000);
    const [initialPayment, setInitialPayment] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { updateAnswer } = useSurvey();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location.state || {};
    const creditTypes = ["Ипотека", "Потребительский кредит", "Авто-кредит", "Микрозайм", 'Кредит под залог'];

    function getWords(years: number): string {
        if (selectedCreditType === 'Ипотека') {
            return getYearsDeclension(years)
        }
        else {
            if (years <= 12) {
                return getMonthDeclension(years)
            }
            else {
                return getYearsDeclension(years - 12)
            }
        }
    }
    const getVisibleTerm = (term: number) => {
        if (selectedCreditType === "Ипотека") {
            return term
        }
        else {
            return term > 12 ? term - 12 : term
        }
    }

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
        if (selectedCreditType === 'Кредит под залог') {
            updateAnswer("credit_type", selectedCreditType);
            navigate('/CreditDeposit')
            return
        }
        if (!selectedCreditType || (selectedCreditType === "Ипотека" && !selectedMortgage) || !term || !amount) {
            setErrorMessage("Пожалуйста, заполните все поля.");
            return;
        }
        if (selectedCreditType === "Ипотека" && !initialPayment) {
            setErrorMessage("Пожалуйста, заполните все поля.");
            return;
        }
        if (selectedCreditType === "Ипотека" && initialPayment < amount * 0.15) {
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
            updateAnswer("term", String(term));
            updateAnswer("isYears", 'да')
        }
        else {
            if (term > 12) {
                updateAnswer("term", String(term - 12));
                updateAnswer("isYears", 'да')
            }
            else {
                updateAnswer("term", String(term));
                updateAnswer("isYears", 'нет')
            }

        }


        updateAnswer("amount", String(amount));
        updateAnswer("initial_payment", String(initialPayment));

        const selected = mortgageTypes.find((mortgage) => mortgage.type === selectedMortgage);
        updateAnswer('procent', String(selected?.procent))
        updateAnswer('maxTerm', String(selected?.maxTerm))


        console.log(selectedCreditType)
        if (selectedCreditType === "Микрозайм") {
            navigate("/7");
            return
        }
        if (selectedCreditType !== "Ипотека") {
            navigate("/salaryConf");
            return
        }
        if (state === 'result') {
            navigate('/result')
            return
        }
        navigate("/2");
    };

    const getMaxTerm = () => {
        if (selectedCreditType === "Ипотека") {
            const selected = mortgageTypes.find((mortgage) => mortgage.type === selectedMortgage);
            return selected ? selected.maxTerm : 0;
        }
        else {
            return 19
        }

    };

    const getVisibleMaxTerm = () => {
        if (selectedCreditType === "Ипотека") {
            const selected = mortgageTypes.find((mortgage) => mortgage.type === selectedMortgage);
            return selected ? selected.maxTerm : 0;
        }
        else {
            return 7
        }

    };

    return (
        <div className="container">
            <p className="question-text">Выберите тип кредита</p>
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
                                <p className="card-details">
                                    {details.map((text, index) => (
                                        <React.Fragment key={index}>
                                            {text}<br />
                                        </React.Fragment>
                                    ))}
                                </p>
                            </Card>
                        ))}
                    </div>
                </>
            )}

            {(selectedMortgage || (selectedCreditType && selectedCreditType !== 'Ипотека')) && (selectedCreditType !== 'Кредит под залог')
                &&
                <div className="form">
                    <label className="form-label">
                        Срок (максимум {getVisibleMaxTerm()} лет):
                        <input
                            type="range"
                            value={term}
                            onChange={(e) => setTerm(Number(e.target.value))}
                            className="form-slider"
                            min="1"
                            max={getMaxTerm()}
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
                    {selectedCreditType === 'Ипотека' &&
                        <NumberInput
                            min={0}
                            max={amount}
                            label={"Первоначальный взнос (не менее 15%):"}
                            value={initialPayment}
                            setValue={setInitialPayment}
                        />
                    }
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
