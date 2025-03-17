import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { useSurvey } from "../SurveyContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";

const banks = [
    "СберБанк", "Банк ВТБ", "Газпромбанк", "Альфа-Банк", "Московский Кредитный Банк", "Россельхозбанк",
    "Совкомбанк", "Райффайзенбанк", "Банк «Открытие»", "ЮниКредит Банк", "Банк «Санкт-Петербург»", "Ак Барс Банк",
    "Почта Банк", "Банк Уралсиб", "Ситибанк", "БМ-Банк", "Тинькофф Банк", "Росбанк",
    "Промсвязьбанк", "Банк «Возрождение»", "Банк «Российский Капитал»", "Банк «Русский Стандарт»", "Банк «Хоум Кредит»",
    "Банк «Ренессанс Кредит»", "Банк «Восточный»", "Банк «Югра»", "Банк «Траст»", "Банк «Мир»", "Банк «Союз»",
    "Банк «Авангард»", "Банк «Абсолют»", "Банк «Агропромкредит»", "Банк «Акцепт»", "Банк «Александровский»", "Банк «Алмазэргиэнбанк»",
    "Банк «Анелик РУ»", "Банк «Апабанк»", "Банк «Арсенал»", "Банк «Ассоциация»", "Банк «Астробанк»", "Банк «Атлас»",
    "Банк «АФ Банк»", "Банк «БайкалИнвестБанк»", "Банк «Балтика»", "Банк «Барс»", "Банк «Башкомснаббанк»", "Банк «ББР Банк»",
    "Банк «БКФ»", "Банк «БКС»", "Банк «БНП Париба Восток»", "Банк «БыстроБанк»", "Банк «Вологжанин»",
    "Банк «ВостСибтранскомбанк»", "Банк «ВТБ 24»", "Банк «ВУЗ-банк»", "Банк «Гарант-Инвест»", "Банк «Глобэкс»", "Банк «Горбанк»",
    "Банк «Далена»", "Банк «ДельтаКредит»", "Банк «Держава»", "Банк «Джей энд Ти Банк»", "Банк «Дойче Банк»", "Банк «Донкомбанк»",
    "Банк «Донстройбанк»", "Банк «Евразийский Банк»", "Банк «ЕвроАксис Банк»", "Банк «Евроальянс»", "Банк «Европейский Стандарт»", "Банк «Европлан»",
    "Банк «Екатеринбург»", "Банк «Енисей»", "Банк «Ермак»", "Банк «Жилкредит»", "Банк «Заречье»", "Банк «Земский Банк»",
    "Банк «Зенит»", "Банк «Златкомбанк»", "Банк «Золотой Кредит»", "Банк «Идея Банк»", "Банк «Ижкомбанк»", "Банк «Инвестбанк»",
    "Банк «Инвестторгбанк»", "Банк «Интеза»", "Банк «Ипотечный Банк Рублев»", "Банк «Иркутский Областной»", "Банк «КБА Банк»", "Банк «Кедр»",
    "Банк «Кипрский Банк»", "Банк «Кольцо Урала»", "Банк «Коммерческий Банк Развития»", "Банк «Конфидэнс Банк»", "Банк «Кредит Европа Банк»", "Банк «Кредит-Москва»"
]


const BankSalaryman: React.FC = () => {
    const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
    const [bank, setBank] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const choiceTypes = ['Да', 'Нет']
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFirstChoice = (answer: string) => {
        setFirstAnswer(answer);
        if (answer === "Нет") {
            setBank("");
            return
        }

    };

    const handleContinue = () => {
        if (firstAnswer === "Да" && !banks.includes(bank)) {
            setErrorMessage('Пожалуйста, выберите регион из списка!')
            return;
        }
        if (!firstAnswer) {
            setErrorMessage('Пожалуйста, заполните все поля.')
            return;
        }

        if (bank.length !== 0) {
            updateAnswer('bankSalaryman', `${firstAnswer}|${bank}`)
        }
        else {
            updateAnswer('bankSalaryman', `${firstAnswer}`)
        }
        navigate('/7')
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setBank(input);

        if (input.length > 0) {
            const filtered = banks
                .filter((r) => r.toLowerCase().includes(input.toLowerCase()))
                .sort((a, b) => {
                    const aIndex = a.toLowerCase().indexOf(input.toLowerCase());
                    const bIndex = b.toLowerCase().indexOf(input.toLowerCase());
                    return aIndex - bIndex; // Сортируем по положению найденного фрагмента
                });

            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };


    const handleSelectBank = (selected: string) => {
        setBank(selected);
        setSuggestions([]);
    };

    useEffect(() => {
        console.log(answers)
    }, [])

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">Являетесь ли Вы зарплатником банка?</p>
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
            {firstAnswer === "Да" && (
                <div className="question">
                    <p className="question-text">Введите какого банка</p>
                    <div className="input-container">
                        <input
                            type="text"
                            className="region-input"
                            value={bank}
                            onChange={handleInputChange}
                            placeholder="Введите название банка..."
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map((s) => (
                                    <li key={s} onClick={() => handleSelectBank(s)}>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>
        </div>
    );
};

export default BankSalaryman;
