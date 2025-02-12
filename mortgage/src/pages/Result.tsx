import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";
import { countUnder18, getYearsDeclension, monthsSince } from "../utils";

const Result: React.FC = () => {
    // const { answers } = useSurvey();
    const navigate = useNavigate();
    // reasons
    const [reasons, setReasons] = useState<string[]>([])
    const [recommendations, setRecommendations] = useState<string[]>([])
    const [isApproved, setIsApproved] = useState<boolean>()
    const answers = {
        "1": "Да|Нет",
        "2": "Да|Тинькофф Банк",
        "3": "Нет",
        "4": "",
        "5": "57",
        "6": "2005-10-10",
        "7": "Женат/замужем",
        "8": "2",
        "9": "Нет|Да",
        "10": "Комбинированная|500000",
        "11": "2023-10-10",
        "12": "ИП|Да",
        "14": "2022-02-01,2021-05-03",
        "15": "Москва",
        "16": "Квартира/Дом",
        "17": "Высшее",
        "18": "",
        "доп1": "Потребительский кредит",
        "доп2": "2",
        "доп3": "[1500,100]",
        "доп4": "[100,90000]",
        "доп5": "Да",
        "доп6": "Нет",
        "доп7": "Нет",
        "доп8": "+",
        "доп9": "800",
        "credit_type": "Ипотека",
        "mortgage_type": "Семейная",
        "term": "15",
        "amount": "10000000",
        "initial_payment": "2000000",
        "procent": "6",
        "maxTerm": "20"
    }

    const findCurrentPayment = (term: number): number => {
        const monthlyProcent = Number(answers['procent']) / 1200
        const mainProcent = (1 + monthlyProcent) ** (term * 12)
        const sum = Number(answers['amount']) - Number(answers['initial_payment'])
        const currentPayment = Math.round(sum * monthlyProcent * mainProcent / (mainProcent - 1))
        return currentPayment
    }

    const findAmount = (newCurrentPayment: number, maxTerm: number): number => {
        const monthlyProcent = Number(answers['procent']) / 1200
        const mainProcent = (1 + monthlyProcent) ** (maxTerm * 12)
        const initialPayment = Number(answers['initial_payment'])

        return Math.round((newCurrentPayment * (mainProcent - 1)) / (monthlyProcent * mainProcent) + initialPayment)
    }

    const checkFinNagruzka = (currentPayment: number): [boolean, number] => {
        let s = 0
        let amountOfPeople = 0
        const limits = JSON.parse(answers['доп3'])
        const payments = JSON.parse(answers['доп4'])

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
        console.log(s)
        if (s >= 90000) {
            s += amountOfPeople * 20000
            s *= 2
            console.log(s)
            if (s < salary) {
                return [true, 0]
            }
            else {
                return [false, (s - salary) / 2]
            }
        }
        else {
            if (s <= 0.3 * salary) {
                return [true, 0]
            }
            else {
                return [false, Math.round(s - 0.3 * salary)]
            }
        }
    }



    const mainTree = () => {
        const [residentRF, residentPermit] = answers['9'].split('|')
        const [typeSalary, salary] = answers['10'].split('|')
        const [isSalaryBank, bank] = answers['2'].split('|')
        const [typeWork, isIPSparvki] = answers['12'].split('|')
        const [criminalRecord, isEcononmicCriminalRecord] = answers['1'].split('|')
        const expirations = answers['доп6']
        const term = Number(answers['term'])
        const maxTerm = Number(answers['maxTerm'])
        const FSSP = answers['3']
        const experience = monthsSince(answers['11'])
        const creditScore = Number(answers['доп9'])
        let isOk = true;
        if (residentRF === 'Нет') {
            if (residentPermit === 'Нет' || typeSalary !== 'Официальная') {
                setReasons(reasons => [...reasons, 'Отсуствие вида на жительства и регистрации.'])
                isOk = false
            }
        }

        if (typeWork === 'ИП' && isIPSparvki === "Нет") {
            setReasons(reasons => [...reasons, 'Отсуствие справки по форме банка и 2-НДФЛ'])
            setRecommendations(recommendations => [...recommendations, 'Сделать справки по форме банка и 2-НДФЛ.'])
            isOk = false
        }
        if (FSSP === 'Да') {
            isOk = false
            setReasons(reasons => [...reasons, 'Наличие исправительного производства'])
            setRecommendations(recommendations => [...recommendations, 'Проверить, что производство убрали с сайта ФССП'])
        }

        if (typeSalary === 'Неофициальная') {
            setRecommendations(recommendations => [...recommendations, 'Требуется справка по форме банка.'])
        }
        else {
            if (isSalaryBank === 'Да') {
                setRecommendations(recommendations => [...recommendations, `Обратитесь в ${bank}. Банк доверяет своим клиентам, поэтому больше шанс получить одобрение кредита.`])
            }
        }

        if (criminalRecord === "Да" && isEcononmicCriminalRecord === "Да") {
            isOk = false
            setReasons(reasons => [...reasons, 'Судимость по экномической статье.'])
            setRecommendations(recommendations => [...recommendations, 'Не дадут ни при каких обстоятельствах.'])
        }

        if (expirations === '-') {
            isOk = false
            setReasons(reasons => [...reasons, 'Не прошло 3 платежа с просрочки.'])
            setRecommendations(recommendations => [...recommendations, 'Выплатить 3 платежа.'])
        }
        const currentPayment = findCurrentPayment(term)
        const [isFinOk, deficit] = checkFinNagruzka(currentPayment)


        if (!isFinOk) {
            console.log('def', deficit)
            // 100 000
            // 120 000
            isOk = false
            if (currentPayment - deficit < 0) {

                // setReasons(reasons => [...reasons, 'Урежут сумму кредита. Новый платёж сформируется так, чтобы фин. нагрузка была равна ЗП (тут надо будет на основе введённых данных посчитать новый платёж'])
                // setReasons(reasons => [...reasons, 'Увеличат срок кредита (надо будет посчитать срок с тем же процентом)'])
                if (typeSalary === 'Официальная') {
                    setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                }
                if (typeSalary === 'Комбинированная') {
                    setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП).'])
                }
            }
            else {
                console.log('можно исправит')
                console.log(term, maxTerm)
                let newTerm = 0;
                let newCurrentPayment = 0;
                for (let i = term; i <= maxTerm; i++) {
                    newCurrentPayment = findCurrentPayment(i)
                    if (currentPayment - newCurrentPayment >= deficit) {
                        newTerm = i
                        break
                    }
                    console.log(newCurrentPayment)
                }
                if (newTerm !== 0) {
                    // только увеличиваем срок кредита
                    console.log('только увеличиваем срок кредита.')
                    setReasons(reasons => [...reasons, `Увеличат срок кредита. Новый - ${newTerm} ${getYearsDeclension(newTerm)}`])
                    // if (typeSalary === 'Официальная') {
                    setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    // }
                    // if (typeSalary === 'Комбинированная') {
                    //     setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП)'])
                    // }

                }
                else {
                    newCurrentPayment = currentPayment - deficit
                    const amount = findAmount(newCurrentPayment, maxTerm)
                    console.log('Увеличиваем срок и уменьшаем сумму кредита', amount)
                    // ищем меньшую сумму
                    // amount = (currPayment*(mainProcent-1)/(monthlyProcent*mainProcent))+inital
                    setReasons(reasons => [...reasons, `Увеличат срок кредита. ${maxTerm} ${getYearsDeclension(maxTerm)}`])
                    setReasons(reasons => [...reasons, `Урежут сумму кредита. До ${amount.toLocaleString('ru-RU')} руб`])
                    // if (typeSalary === 'Официальная') {
                    setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    // }
                    // if (typeSalary === 'Комбинированная') {
                    //     setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП)'])
                    // }
                }
            }
        }

        else {
            if (isOk) {
                if (experience < 3) {
                    isOk = false
                    setReasons(reasons => [...reasons, `Стаж на последнем рабочем месте должен быть больше 3 месяцев`])
                }
                if (creditScore !== 0) {
                    if (creditScore < 795) {
                        isOk = false
                        setReasons(reasons => [...reasons, `Возможно для одобрения не хватит кредитного рейтинга`])
                    }
                }
                else {
                    setReasons(reasons => [...reasons, `Результат может быть неточным из-за отсутствия данных о кредитном рейтинге`])
                }
                
            }

        }
        setIsApproved(isOk)
        console.log(isApproved)

    }
    // В "Итог": 1. Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП)
    // }В "Итог": 3. Вам не хватает n руб./мес. В "Рекомендации": 1. Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на n руб./мес.
    // Если фин. нагрузка не соответствует. Формируем "Итог": 1. Урежут сумму кредита. Новый платёж сформируется так, чтобы фин. нагрузка была равна ЗП (тут надо будет на основе введённых данных посчитать новый платёж) 2. Увеличат срок кредита (надо будет посчитать срок с тем же процентом)
    // const isApproved = true;
    // const reasons = isApproved
    //     ? ["Стабильный доход", "Хорошая кредитная история"]
    //     : ["Низкий уровень дохода", "Высокий уровень долговой нагрузки"];

    // const recommendations = isApproved
    //     ? ["Подготовьте документы для подписания"]
    //     : ["Увеличьте официальный доход", "Погасите часть существующих кредитов"];


    useEffect(() => {
        console.log(answers)
        // console.log(checkFinNagruzka())
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
