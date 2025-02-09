import React, { useEffect } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";
import { countUnder18 } from "../utils";

const Result: React.FC = () => {
    // const { answers } = useSurvey();
    const answers = {
        "1": "Нет",
        "2": "Да",
        "3": "Нет",
        "4": "",
        "5": "10",
        "6": "2005-10-10",
        "7": "Женат/замужем",
        "8": "2",
        "9": "Да",
        "10": "Официальная|150000",
        "11": "2023-02-08",
        "12": "IT",
        "14": "2000-07-07,2024-08-07",
        "15": "Москва",
        "16": "Квартира/Дом",
        "17": "Высшее",
        "18": "1",
        "доп1": "Ипотека",
        "доп2": "2",
        "доп3": "[10000,20000]",
        "доп4": "[40000]",
        "доп5": "Да",
        "доп6": "Нет",
        "доп7": "Нет",
        "доп8": "+",
        "credit_type": "Ипотека",
        "mortgage_type": "Семейная",
        "term": "15",
        "amount": "10000000",
        "initial_payment": "2000000",
        'procent': '6'
    }

    const findCurrentPayment = () => {
        const monthlyProcent = Number(answers['procent']) / 1200
        const mainProcent = (1 + monthlyProcent) ** (Number(answers['term']) * 12)
        const sum = Number(answers['amount']) - Number(answers['initial_payment'])
        const currentPayment = Math.round(sum * monthlyProcent * mainProcent / (mainProcent - 1))
        return currentPayment
    }

    const checkFinNagruzka = () => {
        let s = 0
        let amountOfPeople = 0
        const limits = JSON.parse(answers['доп3'])
        const payments = JSON.parse(answers['доп4'])
        const currentPayment = findCurrentPayment()
        const amountOfChildren = Number(answers['8'])
        const amountOfDependents = Number(answers['18'])
        const birthOfChildren = answers['14']
        const family = answers['7']
        const salary = Number(answers['10'].split('|')[1])

        if (amountOfChildren !== 0) {
            const children = countUnder18(birthOfChildren)
            amountOfPeople += children
        }
        amountOfPeople += amountOfDependents
        amountOfPeople += family === 'Холост' ? 1 : 2

        s += limits.reduce((partialSum: number, a: number) => partialSum + a, 0) / 10
        s += payments.reduce((partialSum: number, a: number) => partialSum + a, 0)
        s += currentPayment
        if (s >= 90000) {
            s += amountOfPeople * 20000
            s *= 2
            if (s < salary) {
                return true
            }
            else {
                return false
            }
        }
        else {
            if (s <= 0.3 * salary) {
                return true
            }
            else {
                return false
            }
        }
    }

    const navigate = useNavigate();

    const isApproved = true;
    const reasons = isApproved
        ? ["Стабильный доход", "Хорошая кредитная история"]
        : ["Низкий уровень дохода", "Высокий уровень долговой нагрузки"];

    const recommendations = isApproved
        ? ["Подготовьте документы для подписания"]
        : ["Увеличьте официальный доход", "Погасите часть существующих кредитов"];


    useEffect(() => {
        
        console.log(checkFinNagruzka())
    }, [])
    return (
        <div className="container">
            <h1 className={`approval-title ${isApproved ? "approved" : "declined"}`}>
                {isApproved ? "Кредит будет одобрен" : "Кредит не будет одобрен"}
            </h1>

            <div className="result-box">
                <h2>Причины:</h2>
                <ul>
                    {reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                    ))}
                </ul>
            </div>

            <div className="recommendation-box">
                <h2>Рекомендации:</h2>
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                    ))}
                </ul>
            </div>

            <button onClick={() => navigate("/")} className="button">
                Завершить
            </button>
        </div>
    );
};

export default Result;
