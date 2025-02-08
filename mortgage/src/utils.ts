export const countUnder18 = (birthdays: string): number => {
    const today = new Date();
    const currentYear = today.getFullYear();

    return birthdays.split(",").filter(dateStr => {
        const birthDate = new Date(dateStr.trim());
        const age = currentYear - birthDate.getFullYear();

        if (age < 18 || (age === 18 && today < new Date(birthDate.setFullYear(currentYear)))) {
            return true;
        }
        return false;
    }).length;
};

export const mortgageTypes = [
    { type: "Дальневосточная", details: "Максимум на 20 лет, с 21 до 65 лет, семья (учителя, врачи, IT до 36 лет), 2% годовых", maxTerm: 20, procent: 2 },
    { type: "Сельская", details: "Максимум на 25 лет, 3% годовых, с 21 до 65 лет", maxTerm: 25, procent: 3 },
    { type: "IT", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет, аккредитованная компания", maxTerm: 20, procent: 6 },
    { type: "Арктическая", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет", maxTerm: 20, procent: 6 },
    { type: "Семейная", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет, 1 ребенок (2019+ года рождения) или 2 ребенка меньше 18 лет", maxTerm: 20, procent: 6 },
    { type: "Нельготная", details: "Максимум на 30 лет, людям с 20 до 65 лет, около 24% годовых", maxTerm: 30, procent: 24 },
];