import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";
import { checkFinNagruzka, findAmount, findCurrentPayment, findTypesOfCredit, getYearsDeclension, monthsSince } from "../utils";

const Result: React.FC = () => {
    const { answers, clearAnswers } = useSurvey();
    const navigate = useNavigate();
    const [reasons, setReasons] = useState<string[]>([])
    const [recommendations, setRecommendations] = useState<string[]>([])
    const [isApproved, setIsApproved] = useState<boolean>()
    const [isCreditType, setIsCreditType] = useState<boolean>(true)
    const [isCreditScore, setIsCreditScore] = useState<boolean>(true)
    const [reasonsRejectedType, setReasonsRejectedType] = useState<string[]>([])
    // const answers = {
    //     "credit_type": "Ипотека",
    //     "mortgage_type": "Семейная",
    //     "term": "10",
    //     "amount": "10000000",
    //     "initial_payment": "2000000",
    //     "procent": "6",
    //     "maxTerm": "20",
    //     "region": "Астраханьская область",
    //     "resident": "Да",
    //     "judge": "Да|Нет",
    //     "FSSP": "Да",
    //     "bankSalaryman": "Да|Банк ВТБ",
    //     "creditScore": "0",
    //     'isYears': 'нет',
    //     "доп1": "[\"Ипотека\",\"Кредитная карта\"]",
    //     "доп2": "3",
    //     "доп3": "[2,3,5]",
    //     "доп31": "1",
    //     "доп4": "[123123]",
    //     "доп5": "Да",
    //     "доп6": "Да",
    //     "доп7": "Нет",
    //     "доп8": "-",
    //     "dateBirth": "1999-01-01",
    //     "family": "Холост",
    //     "amountChildren": "0",
    //     "childrenBirth": "2005-10-10,2020-10-10",
    //     "dependents": "2",
    //     "salary": "Комбинированная|600000",
    //     "salaryExtra": "150000",
    //     "experience": "2020-01-01",
    //     "work": "Врач",
    //     "education": "Высшее",
    //     "availability": "[\"Автомобиль\",\"Квартира/Дом\",\"Земельный участок\"]",
    //     "hasDeposit": 'Нет',
    //     'has50': 'Нет'
    // }


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

        const creditType = answers['credit_type']
        let isOk = true

        if (creditType === 'Микрозайм') {
            const creditScore = Number(answers['creditScore'])
            let expirations = answers['доп8']
            if (expirations === '-') {
                isOk = false
                setRecommendations(recommendations => [...recommendations, 'С момента последней просрочки должно пройти 3 платежа.'])
            }
            if (creditScore !== 0) {
                if (creditScore < 500) {
                    isOk = false
                    setRecommendations(recommendations => [...recommendations, 'Поднять кредитный рейтинг.'])
                }
            }
            else {
                setIsCreditScore(false)
                // setReasons(reasons => [...reasons, `Результат может быть неточным из-за отсутствия данных о кредитном рейтинге.`])
            }
            setIsApproved(isOk)
            return
        }
        let hasDeposit: string;
        if (creditType === 'Кредит под залог') {
            hasDeposit = answers['hasDeposit']
            if (hasDeposit === 'Нет') {
                setRecommendations(recommendations => [...recommendations, 'Для кредита под залог необходимо иметь имущество в виде квартиры или дома.'])
                setReasons(reasons => [...reasons, 'Отсутствует имущество под залог'])
                isOk = false
                setIsApproved(isOk)
                return
            }
            else {
                setRecommendations(recommendations => [...recommendations, 'Имущество оценивается со стороны банка, отсюда и формулировка "50% от оценочной стоимости".'])
            }
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
        let term = Number(answers['term'])
        let amount = Number(answers['amount'])
        const isYears = answers['isYears']
        term = isYears === 'да' ? term : term / 12
        const dateBirth = answers['dateBirth']
        const FSSP = answers['FSSP']
        const region = answers['region']
        const experience = monthsSince(answers['experience'])
        const isCreditsBefore = answers['доп5']
        const isRejectsBefore = answers['доп6']
        const creditScore = Number(answers['creditScore'])
        let expirations = answers['доп8']

        // Проверяем фин. нагрузку и остальные критерии как у ипотеки, кроме детей, иждивенцев, сферы деятельности и наличия машины или квартиры   В "Рекомендации": 1. 
        // Кредит не одобрят   В "Итог": 1.    "Рекомендации": 1. 
        let maxTerm: number
        let initial_payment = 0

        if (creditType === 'Ипотека') {
            maxTerm = Number(answers['maxTerm'])
            initial_payment = Number(answers['initial_payment'])
            const mortgage_type = answers['mortgage_type']
            const [isCreditTypeOk, reasons] = findTypesOfCredit(dateBirth, region, birthOfChildren, family, amountOfChildren, typeWork, mortgage_type)
            if (!isCreditTypeOk) {
                setIsCreditType(false)
                setReasonsRejectedType(reasons)
            }
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
            if (residentPermit === 'Нет') {
                setReasons(reasons => [...reasons, 'Отсуствие вида на жительства и регистрации.'])
                isOk = false
            }
            if (typeSalary === 'Неофицальная') {
                setReasons(reasons => [...reasons, 'Неофицальная зарабатная плата'])
            }
        }

        if (typeWork === 'ИП' && isIPSparvki === "Нет") {
            setReasons(reasons => [...reasons, 'Отсуствие справки по форме банка и 2-НДФЛ'])
            setRecommendations(recommendations => [...recommendations, 'Сделать справки по форме банка и 2-НДФЛ.'])
            isOk = false
        }
        if (FSSP === 'Да') {
            isOk = false
            setReasons(reasons => [...reasons, 'Наличие исполнительного производства'])
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
        let [isFinOk, deficit] = checkFinNagruzka(currentPayment, limits, payments, amountOfChildren, amountOfDependents, birthOfChildren, family, salary)

        if (typeSalary === 'Комбинированная' && isFinOk) {
            const salaryExtra = Number(answers['salaryExtra'])
            let [isFinOk, deficit] = checkFinNagruzka(currentPayment, limits, payments, amountOfChildren, amountOfDependents, birthOfChildren, family, salary - salaryExtra)
            if (!isFinOk) {
                setReasons(reasons => [...reasons, `Не хватает ${deficit.toLocaleString('ru-RU')} рублей официальной заработной платы. Стоит взять справку по форме банка на всю сумму.Так как общая комбинированная зарплата финансовой нагрузке соответствует.`])
                if (currentPayment - deficit > 0) {
                    console.log('yes')
                    let newTerm = 0;
                    let newCurrentPayment = 0;
                    for (let i = Math.round(term); i <= maxTerm; i++) {
                        newCurrentPayment = findCurrentPayment(i, procent, initial_payment, amount)
                        if (currentPayment - newCurrentPayment >= deficit) {
                            console.log(i)
                            newTerm = i
                            break
                        }
                    }
                    if (newTerm !== 0) {
                        // только увеличиваем срок кредита
                        // Если подать заявку в банк только по официальной зарплате:
                        // а) Вам уменьшат сумму до ...
                        // б) Увеличат срок до ...
                        setReasons(reasons => [...reasons, `Если подать заявку в банк только по официальной зарплате: | Увеличат срок кредита до ${newTerm} ${getYearsDeclension(newTerm)}`])
                    }
                    else {
                        newCurrentPayment = currentPayment - deficit
                        const amount = findAmount(newCurrentPayment, maxTerm, initial_payment, procent)
                        setReasons(reasons => [...reasons, `Если подать заявку в банк только по официальной зарплате: | a) Увеличат срок кредита до ${maxTerm} ${getYearsDeclension(maxTerm)} | б) Вам уменьшат сумму до ${amount.toLocaleString('ru-RU')} руб`])
                    }
                }
            }
        }


        if (!isFinOk) {

            isOk = false
            if (currentPayment - deficit < 0) {

                setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])

                // if (typeSalary === 'Комбинированная') {
                //     setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП).'])
                // }
            }
            else {
                let newTerm = 0;
                let newCurrentPayment = 0;
                for (let i = Math.round(term); i <= maxTerm; i++) {
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

                    // if (typeSalary === 'Комбинированная') {
                    //     setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП).'])
                    // }

                }
                else {

                    newCurrentPayment = currentPayment - deficit
                    const amount = findAmount(newCurrentPayment, maxTerm, initial_payment, procent)
                    setReasons(reasons => [...reasons, `Увеличат срок кредита. ${maxTerm} ${getYearsDeclension(maxTerm)}`])
                    setReasons(reasons => [...reasons, `Урежут сумму кредита. До ${amount.toLocaleString('ru-RU')} руб`])
                    setReasons(reasons => [...reasons, `Финансовая нагрузка слишком большая. Вам не хватает ${deficit.toLocaleString('ru-RU')} руб./мес.`])
                    setRecommendations(recommendations => [...recommendations, `Закрыть действующие кредитные карты и платежи и уменьшить фин. нагрузку на ${deficit.toLocaleString('ru-RU')} руб./мес.`])

                    // if (typeSalary === 'Комбинированная') {
                    //     setReasons(reasons => [...reasons, 'Требуется справка по форме банка на всю сумму (сколько не хватает из официальной ЗП).'])
                    // }
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
            setIsCreditScore(false)
            // setReasons(reasons => [...reasons, `Результат может быть неточным из-за отсутствия данных о кредитном рейтинге.`])
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
    const handlerNewCredit = () => {
        navigate("/1", { state: { state: 'result' } })
    }

    return (
        <div className="container">
            <h1 className={`approval-title ${isApproved ? "approved" : "declined"}`}>
                {isApproved ? "Будет одобрено" : "Будет отказ"}
            </h1>
            {isCreditScore === false &&
                <div className="recommendation-box">
                    <h2>Результат может быть неточным из-за отсутствия данных о кредитном рейтинге.</h2>

                </div>
            }
            {reasons.length !== 0 &&
                <div className="result-box">
                    <h2>Причины</h2>
                    <ul>
                        {reasons.map((reason, index) =>
                            reason.startsWith('Если подать заявку в банк только по официальной зарплате') ? (
                                reason.split('|').map((r, ind) =>
                                    <React.Fragment key={`${index}-${ind}`}>
                                        {r}<br />
                                    </React.Fragment>
                                )
                            ) : (
                                <li key={index}>{reason}</li>
                            )
                        )}
                    </ul>
                </div>
            }

            {
                recommendations.length !== 0 &&
                <div className="recommendation-box">
                    <h2>Рекомендации</h2>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </div>
            }
            {
                isCreditScore === false &&
                <div className="recommendation-box">
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
            {
                isCreditType === false &&
                <div className="recommendation-box">
                    <h2>Программа ипотеки</h2>
                    <p>
                        Скорее всего, вы не подходите под условия выбранной ипотеки. Попробуйте выбрать другую.
                    </p>
                    <ul>
                        {reasonsRejectedType.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>

                    <button onClick={handlerNewCredit} className="button">
                        Выбрать программу
                    </button>
                </div>
            }

            <button onClick={handlerEnd} className="button" >
                Завершить
            </button>
        </div >
    );
};

export default Result;