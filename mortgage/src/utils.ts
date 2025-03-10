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

export const countUnder6 = (birthdays: string): number => {
    const today = new Date();
    const currentYear = today.getFullYear();

    return birthdays.split(",").filter(dateStr => {
        const birthDate = new Date(dateStr.trim());
        const age = currentYear - birthDate.getFullYear();

        if (age < 6 || (age === 6 && today < new Date(birthDate.setFullYear(currentYear)))) {
            return true;
        }
        return false;
    }).length;
};


export const mortgageTypes = [
    { type: "Дальневосточная", details: "Максимум на 20 лет, с 21 до 65 лет, семья (учителя, врачи, IT до 36 лет), 2% годовых", maxTerm: 20, procent: 2 },
    { type: "Сельская", details: "Максимум на 25 лет, 3% годовых, с 21 до 65 лет", maxTerm: 25, procent: 3 },
    { type: "IT", details: "Максимум на 20 лет, 6% годовых, с 21 до 50 лет, аккредитованная компания", maxTerm: 20, procent: 6 },
    { type: "Арктическая", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет", maxTerm: 20, procent: 6 },
    { type: "Семейная", details: "Максимум на 20 лет, 6% годовых, с 21 до 65 лет, 1 ребенок (2019+ года рождения) или 2 ребенка меньше 18 лет", maxTerm: 20, procent: 6 },
    { type: "Нельготная", details: "Максимум на 30 лет, людям с 20 до 65 лет, около 24% годовых", maxTerm: 30, procent: 24 },
];

export function getYearsDeclension(years: number): string {
    if (years % 10 === 1 && years % 100 !== 11) {
        return `год`;
    } else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
        return `года`;
    } else {
        return `лет`;
    }
}

export function monthsSince(dateString: string): number {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const yearsDiff = currentDate.getFullYear() - givenDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - givenDate.getMonth();
    return Math.floor(yearsDiff * 12 + monthsDiff);
}

export const findCurrentPayment = (term: number, procent: number, initial_payment: number, amount: number): number => {
    const monthlyProcent = procent / 1200
    const mainProcent = (1 + monthlyProcent) ** (term * 12)
    const sum = amount - initial_payment
    const currentPayment = Math.round(sum * monthlyProcent * mainProcent / (mainProcent - 1))
    return currentPayment
}

export const findAmount = (newCurrentPayment: number, maxTerm: number, initial_payment: number, procent: number): number => {
    const monthlyProcent = procent / 1200
    const mainProcent = (1 + monthlyProcent) ** (maxTerm * 12)
    return Math.round((newCurrentPayment * (mainProcent - 1)) / (monthlyProcent * mainProcent) + initial_payment)
}