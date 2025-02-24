import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";
import { countUnder18, getYearsDeclension, monthsSince } from "../utils";

const Result: React.FC = () => {
    // const { answers, clearAnswers } = useSurvey();
    const navigate = useNavigate();
    const [reasons, setReasons] = useState<string[]>([])
    const [recommendations, setRecommendations] = useState<string[]>([])
    const [isApproved, setIsApproved] = useState<boolean>()
    const answers = {
        "credit_type": "Ипотека",
        "mortgage_type": "Арктическая",
        "term": "15",
        "amount": "10000000",
        "initial_payment": "2000000",
        "procent": "6",
        "maxTerm": "20",
        "region": "Архангельская область",
        "resident": "Да",
        "judge": "Да|Нет",
        "FSSP": "Нет",
        "bankSalaryman": "Да|Банк ВТБ",
        "creditScore": "800",
        "доп1": "[\"Ипотека\",\"Кредитная карта\"]",
        "доп2": "3",
        "доп3": "[2,3,5]",
        "доп31": "1",
        "доп4": "[123123]",
        "доп5": "Да",
        "доп6": "Да",
        "доп7": "Нет",
        "доп8": "+",
        "dateBirth": "1999-01-01",
        "family": "Холост",
        "amountChildren": "2",
        "childrenBirth": "2005-10-10,2020-10-10",
        "dependents": "2",
        "salary": "Официальная|30000",
        "experience": "2020-01-01",
        "work": "Врач",
        "education": "Высшее",
        "availability": "[\"Автомобиль\",\"Квартира/Дом\",\"Земельный участок\"]"
    }

    const findCurrentPayment = (term: number, procent: number, initial_payment: number, amount: number): number => {
        const monthlyProcent = procent / 1200
        const mainProcent = (1 + monthlyProcent) ** (term * 12)
        const sum = amount - initial_payment
        const currentPayment = Math.round(sum * monthlyProcent * mainProcent / (mainProcent - 1))
        return currentPayment
    }

    const findAmount = (newCurrentPayment: number, maxTerm: number, initial_payment: number, procent: number): number => {
        const monthlyProcent = procent / 1200
        const mainProcent = (1 + monthlyProcent) ** (maxTerm * 12)
        return Math.round((newCurrentPayment * (mainProcent - 1)) / (monthlyProcent * mainProcent) + initial_payment)
    }

    const checkFinNagruzka = (
        currentPayment: number,
        limits: number[],
        payments: number[],
        amountOfChildren: number,
        amountOfDependents: number,
        birthOfChildren: string,
        family: string,
        salary: number
    ): [boolean, number] => {

        let s = 0
        let amountOfPeople = 0

        if (amountOfChildren !== 0) {
            const children = countUnder18(birthOfChildren)

            amountOfPeople += children
        }

        amountOfPeople += amountOfDependents

        amountOfPeople += family === 'Холост' ? 1 : 2

        if (limits.length !== 0) {
            s += limits.reduce((partialSum: number, a: number) => partialSum + a, 0) / 10
        }
        if (payments.length !== 0) {
            s += payments.reduce((partialSum: number, a: number) => partialSum + a, 0)
        }
        s += currentPayment

        if (s >= 90000) {
            s += amountOfPeople * 20000

            s *= 2
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

    const commonRecommendations = (isCreditsBefore: string, isRejectsBefore: string) => {
        // общие рекомендации
        if (isCreditsBefore === 'Да') {
            setRecommendations(recommendations => [...recommendations, 'У вас уже были кредиты - это хорошо.'])
        }
        if (isRejectsBefore === 'Да') {
            setRecommendations(recommendations => [...recommendations, 'Каждый отказ снижает кредитный рейтинг. Если были отказы, то шансы невысокие.'])
        }

        setRecommendations(recommendations => [...recommendations, 'Проверьте подтверждающие документы.'])
        setRecommendations(recommendations => [...recommendations, 'Обязательно проверьте созаёмщика/поручителя!'])
    }

    const mainTree = () => {
        const creditScore = Number(answers['creditScore'])
        const expirations = answers['доп8']
        const creditType = answers['credit_type']
        let isOk = true

        if (creditType === 'Микрозайм') {
            if (expirations === '-') {
                isOk = false
                setRecommendations(recommendations => [...recommendations, 'С момента последней просрочки должно пройти 3 платежа.'])
            }
            if (creditScore < 500) {
                isOk = false
                setRecommendations(recommendations => [...recommendations, 'Поднять кредитный рейтинг.'])
            }
            setIsApproved(isOk)
            return

        }
        // В "Итог": 1. Микрозайм не дадут   В "Рекомендации": 1.(если ответил, что есть активные просрочки) 2. (если ответил, что он ниже 500)
        const [residentRF, residentPermit] = answers['resident'].split('|')
        let [typeSalary, salaryString] = answers['salary'].split('|')
        const [isSalaryBank, bank] = answers['bankSalaryman'].split('|')
        const [typeWork, isIPSparvki] = answers['work'].split('|')
        const [criminalRecord, isEcononmicCriminalRecord] = answers['judge'].split('|')
        const limits = JSON.parse(answers['доп3'])
        const payments = JSON.parse(answers['доп4'])
        const amountOfChildren = Number(answers['amountChildren'])
        const amountOfDependents = Number(answers['dependents'])
        const birthOfChildren = answers['childrenBirth']
        const family = answers['family']
        const salary = Number(salaryString)
        const procent = Number(answers['procent'])
        const term = Number(answers['term'])
        let amount = Number(answers['amount'])
        const FSSP = answers['FSSP']
        const experience = monthsSince(answers['experience'])
        const isCreditsBefore = answers['доп5']
        const isRejectsBefore = answers['доп6']


        let maxTerm: number
        let initial_payment = 0
        if (creditType === 'Ипотека') {
            maxTerm = Number(answers['maxTerm'])
            initial_payment = Number(answers['initial_payment'])
        }
        else {
            maxTerm = 7
        }

        if (creditType === 'Потребительский кредит' || creditType === 'Авто-кредит') {
            const salaryConf = answers['salaryConf']
            setRecommendations(recommendations => [...recommendations, 'Банк может позвонить работодателю по номеру, что клиент указывает в заявке.'])

            if (salaryConf === 'Нет') {
                if (amount > 1000000) {
                    if (creditType === 'Потребительский кредит') {
                        setReasons(reasons => [...reasons, 'Из-за отсутвия подтверждения дохода сумма кредита максимум 1млн руб.'])
                    }
                    if (creditType === 'Авто-кредит') {
                        setReasons(reasons => [...reasons, 'Обратить внимание на подтверждающие документы.'])
                    }
                    amount = 1000000
                }
            }
        }
        if (creditType === 'Авто-кредит') {
            setRecommendations(recommendations => [...recommendations, 'Желательно иметь высшее образование.'])
            setRecommendations(recommendations => [...recommendations, 'Больше года быть замужем/женатым.'])
            setRecommendations(recommendations => [...recommendations, 'Отсутствие иждивенцев будет плюсом.'])
            setRecommendations(recommendations => [...recommendations, 'Если являетесь самозанятым, то нужны подтверждающие документы.'])
            setRecommendations(recommendations => [...recommendations, 'Преимуществом будет иметь своё преимущество.'])
            setRecommendations(recommendations => [...recommendations, 'Подготовьте контактное лицо.'])
        }

        // В "Рекомендации" дополнительно пишем: 1. Желательно иметь высшее образование 2. Больше года быть замужем/женатым 3. Отсутствие иждивенцев будет плюсом 4. Если являетесь самозанятым, то нужны подтверждающие документы 5. Преимуществом будет иметь своё преимущество 6. Подготовьте контактное лицо
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
        const currentPayment = findCurrentPayment(term, procent, initial_payment, amount)
        const [isFinOk, deficit] = checkFinNagruzka(currentPayment, limits, payments, amountOfChildren, amountOfDependents, birthOfChildren, family, salary)

        if (!isFinOk) {

            isOk = false
            if (currentPayment - deficit < 0) {

                setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])

                if (typeSalary === 'Комбинированная') {
                    setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП).'])
                }
            }
            else {
                let newTerm = 0;
                let newCurrentPayment = 0;
                for (let i = term; i <= maxTerm; i++) {
                    newCurrentPayment = findCurrentPayment(i, procent, initial_payment, amount)
                    if (currentPayment - newCurrentPayment >= deficit) {
                        newTerm = i
                        break
                    }
                }
                if (newTerm !== 0) {
                    // только увеличиваем срок кредита
                    setReasons(reasons => [...reasons, `Увеличат срок кредита. Новый - ${newTerm} ${getYearsDeclension(newTerm)}`])
                    setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])

                    if (typeSalary === 'Комбинированная') {
                        setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП).'])
                    }

                }
                else {

                    newCurrentPayment = currentPayment - deficit
                    const amount = findAmount(newCurrentPayment, maxTerm, initial_payment, procent)
                    setReasons(reasons => [...reasons, `Увеличат срок кредита. ${maxTerm} ${getYearsDeclension(maxTerm)}`])
                    setReasons(reasons => [...reasons, `Урежут сумму кредита. До ${amount.toLocaleString('ru-RU')} руб`])
                    setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])

                    if (typeSalary === 'Комбинированная') {
                        setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП).'])
                    }
                }
            }
        }


        if (experience < 3) {
            isOk = false
            setReasons(reasons => [...reasons, `Стаж на последнем рабочем месте должен быть больше 3 месяцев.`])
        }
        if (creditScore !== 0) {
            if (creditScore < 795) {
                isOk = false
                setReasons(reasons => [...reasons, `Возможно для одобрения не хватит кредитного рейтинга.`])
            }
        }
        else {
            setReasons(reasons => [...reasons, `Результат может быть неточным из-за отсутствия данных о кредитном рейтинге.`])
        }

        commonRecommendations(isCreditsBefore, isRejectsBefore)

        setIsApproved(isOk)

    }

    useEffect(() => {
        console.log(answers)
        mainTree()
    }, [])

    const handlerEnd = () => {
        // clearAnswers()

        navigate("/")
    }

    return (
        <div className="container">
            <h1 className={`approval-title ${isApproved ? "approved" : "declined"}`}>
                {isApproved ? "Будет одобрено" : "Будет отказ"}
            </h1>
            {reasons.length !== 0 &&
                <div className="result-box">
                    <h2>Причины:</h2>
                    <ul>
                        {reasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                </div>
            }

            {recommendations.length !== 0 &&
                <div className="recommendation-box">
                    <h2>Рекомендации:</h2>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </div>
            }


            <button onClick={handlerEnd} className="button">
                Завершить
            </button>
        </div>
    );
};

export default Result;
