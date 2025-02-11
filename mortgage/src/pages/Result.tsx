import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";
import { countUnder18 } from "../utils";

const Result: React.FC = () => {
    // const { answers } = useSurvey();
    const navigate = useNavigate();
    // reasons
    const [reasons, setReasons] = useState<string[]>([])
    const [recommendations, setRecommendations] = useState<string[]>([])
    const [isApproved, setIsApproved] = useState<boolean>()
    const answers = {
        "1": "Нет",
        "2": "Да|Тинькофф Банк",
        "3": "Нет",
        "4": "",
        "5": "57",
        "6": "2005-10-10",
        "7": "Женат/замужем",
        "8": "2",
        "9": "Нет|Да",
        "10": "Официальная|500000",
        "11": "2023-10-10",
        "12": "ИП|Да",
        "14": "2022-02-01,2021-05-03",
        "15": "Москва",
        "16": "Квартира/Дом",
        "17": "Высшее",
        "18": "1",
        "доп1": "Потребительский кредит",
        "доп2": "2",
        "доп3": "[20000,20000]",
        "доп4": "[10000,20000]",
        "доп5": "Да",
        "доп6": "Нет",
        "доп7": "Нет",
        "доп8": "+",
        "credit_type": "Ипотека",
        "mortgage_type": "Семейная",
        "term": "15",
        "amount": "1000000",
        "initial_payment": "200000",
        "procent": "6"
    }

    const findCurrentPayment = (): number => {
        const monthlyProcent = Number(answers['procent']) / 1200
        const mainProcent = (1 + monthlyProcent) ** (Number(answers['term']) * 12)
        const sum = Number(answers['amount']) - Number(answers['initial_payment'])
        const currentPayment = Math.round(sum * monthlyProcent * mainProcent / (mainProcent - 1))
        return currentPayment
    }

    const checkFinNagruzka = (): boolean => {
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



    const mainTree = () => {
        const [residentRF, residentPermit] = answers['9'].split('|')
        const [typeSalary, salary] = answers['10'].split('|')
        const [isSalaryBank, bank] = answers['2'].split('|')
        const [typeWork, isIPSparvki] = answers['12'].split('|')
        const FSSP = answers['3']
        if (residentRF === 'Нет') {
            if (residentPermit === 'Нет' || typeSalary !== 'Официальная') {
                setReasons([...reasons, 'Отсуствие вида на жительства и регистрации.'])
                setIsApproved(false)
            }
        }

        if (typeWork === 'ИП' && isIPSparvki === "Нет") {
            setReasons([...reasons, 'Отсуствие справки по форме банка и 2-НДФЛ'])
            setRecommendations([...recommendations, 'Сделать справки по форме банка и 2-НДФЛ.'])
            setIsApproved(false)
        }
        if (FSSP === 'Да') {
            setIsApproved(false)
            setReasons([...reasons, 'Наличие исправительного производства'])
            setRecommendations([...recommendations, 'Проверить, что производство убрали с сайта ФССП'])
        }

        if (typeSalary === 'Неофициальная') {
            setRecommendations([...recommendations, 'Требуется справка по форме банка.'])
        }
        else {
            if (isSalaryBank === 'Да') {
                setRecommendations([...recommendations, `Обратитесь в ${bank}. Банк доверяет своим клиентам, поэтому больше шанс получить одобрение кредита.`])
            }
        }

        const isFinOk = checkFinNagruzka()
        

    }

    // const isApproved = true;
    // const reasons = isApproved
    //     ? ["Стабильный доход", "Хорошая кредитная история"]
    //     : ["Низкий уровень дохода", "Высокий уровень долговой нагрузки"];

    // const recommendations = isApproved
    //     ? ["Подготовьте документы для подписания"]
    //     : ["Увеличьте официальный доход", "Погасите часть существующих кредитов"];


    useEffect(() => {
        console.log(answers)
        console.log(checkFinNagruzka())
        mainTree()
    }, [])
    return (
        <div className="container">
            <h1 className={`approval-title ${isApproved ? "approved" : "declined"}`}>
                {isApproved ? "Будет одобрено" : "Будет отказ"}
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
