import React, { useEffect, useState } from "react";
import { useSurvey } from "../SurveyContext";
import Error from "../components/Error/Error";
import { useNavigate } from "react-router-dom";
import "../styles/Question15.css";

const regions = [
    "Москва", "Санкт-Петербург", "Московская область", "Ленинградская область", "Адыгея",
    "Башкортостан", "Бурятия", "Алтай", "Дагестан", "Ингушетия", "Кабардино-Балкария",
    "Калмыкия", "Карачаево-Черкесия", "Карелия", "Коми", "Марий Эл", "Мордовия",
    "Саха (Якутия)", "Северная Осетия - Алания", "Татарстан", "Тыва", "Удмуртия",
    "Хакасия", "Чувашия", "Алтайский край", "Краснодарский край", "Красноярский край",
    "Приморский край", "Ставропольский край", "Хабаровский край", "Амурская область",
    "Архангельская область", "Астраханская область", "Белгородская область",
    "Брянская область", "Владимирская область", "Волгоградская область",
    "Вологодская область", "Воронежская область", "Ивановская область",
    "Иркутская область", "Калининградская область", "Калужская область",
    "Камчатский край", "Кемеровская область", "Кировская область",
    "Костромская область", "Курганская область", "Курская область",
    "Липецкая область", "Магаданская область", "Мурманская область",
    "Нижегородская область", "Новгородская область", "Новосибирская область",
    "Омская область", "Оренбургская область", "Орловская область",
    "Пензенская область", "Пермский край", "Псковская область",
    "Ростовская область", "Рязанская область", "Самарская область",
    "Саратовская область", "Сахалинская область", "Свердловская область",
    "Смоленская область", "Тамбовская область", "Тверская область",
    "Томская область", "Тульская область", "Тюменская область",
    "Ульяновская область", "Челябинская область", "Забайкальский край",
    "Ярославская область", "Еврейская автономная область",
    "Ненецкий автономный округ", "Ханты-Мансийский автономный округ - Югра",
    "Чукотский автономный округ", "Ямало-Ненецкий автономный округ", "Крым",
    "ДНР", "ЛНР", "Херсонская область", "Запорожская область"
];

const Question15: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [region, setRegion] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    useEffect(() => {
        console.log(answers);
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setRegion(input);

        if (input.length > 0) {
            const filtered = regions.filter((r) =>
                r.toLowerCase().startsWith(input.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectRegion = (selected: string) => {
        setRegion(selected);
        setSuggestions([]);
    };

    const handleContinue = () => {
        if (!regions.includes(region)) {
            setErrorMessage('Пожалуйста, выберите регион из списка!')
            return;
        }

        updateAnswer("15", region);
        navigate("/16");
        console.log(answers);
    };

    return (
        <div className="container">
            <h1 className="title">Анкета</h1>

            <div className="question">
                <p className="question-text">15. Регион, где планируете взять ипотеку</p>
                <div className="input-container">
                    <input
                        type="text"
                        className="region-input"
                        value={region}
                        onChange={handleInputChange}
                        placeholder="Введите название региона..."
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((s) => (
                                <li key={s} onClick={() => handleSelectRegion(s)}>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Error message={errorMessage} setMessage={setErrorMessage} />
            <button onClick={handleContinue} className="button">
                Продолжить
            </button>

        </div>
    );
};

export default Question15;
