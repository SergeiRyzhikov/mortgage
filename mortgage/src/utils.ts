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
    { type: "Дальневосточная", details: ['Ставка: 2% годовых', 'Срок: до 20 лет', 'Возраст: 21–65 лет', 'Для семей, учителей, врачей, IT-специалистов, участников СВО'], maxTerm: 20, procent: 2 },
    { type: "Сельская", details: ['Ставка: 3% годовых', 'Срок: до 25 лет', 'Возраст: 21–65 лет', 'Для покупки жилья в сельской местности'], maxTerm: 25, procent: 3 },
    { type: "IT", details: ['Ставка: 6% годовых', 'Срок: до 20 лет', 'Возраст: 21–50 лет', 'Для сотрудников аккредитованных IT-компаний'], maxTerm: 20, procent: 6 },
    { type: "Арктическая", details: ['Ставка: 6% годовых', 'Срок: до 20 лет', 'Возраст: 21–65 лет', 'Для покупки жилья в арктической зоне'], maxTerm: 20, procent: 6 },
    { type: "Семейная", details: ['Ставка: 6% годовых', 'Срок: до 20 лет', 'Возраст: 21–65 лет', 'Для семей с 1 ребенком (рожд. с 2019 г.) или 2 детьми до 18 лет'], maxTerm: 20, procent: 6 },
    { type: "Нельготная", details: ['Ставка: ~24% годовых', 'Срок: до 30 лет', 'Возраст: 20–65 лет', 'Без льгот, стандартные условия банков'], maxTerm: 30, procent: 24 },
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
export function getMonthDeclension(months: number): string {
    if (months % 10 === 1 && months % 100 !== 11) {
        return `месяц`;
    } else if ([2, 3, 4].includes(months % 10) && ![12, 13, 14].includes(months % 100)) {
        return `месяца`;
    } else {
        return `месяцев`;
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
const regionsDFO = ["Бурятия", "Саха (Якутия)", "Забайкальский край", "Камчатский край", "Приморский край", "Хабаровский край", "Амурская область", "Магаданская область", "Сахалинская область", "Еврейская автономная область", "Чукотский автономный округ"]
const regionsArctika = ["Мурманская область", "Ненецкий автономный округ", "Ямало-Ненецкий автономный округ", "Карелия", "Коми", "Архангельская область", "Красноярский край"]

export const findTypesOfCredit = (dateBirth: string, region: string, childrenBirth: string, family: string, amountOfChildren: number, work: string, currentType: string): [boolean, string[]] => {
    const givenDate = new Date(dateBirth)
    const currentDate = new Date()
    const age = currentDate.getFullYear() - givenDate.getFullYear()
    let isOk = true
    const reasonsRejected: string[] = []
    let children = 0
    let childrenUnder6 = 0
    if (amountOfChildren !== 0) {
        children = countUnder18(childrenBirth)
        childrenUnder6 = countUnder6(childrenBirth)
    }
    if (age <= 21 || age >= 65) {
        return [false, ['Возраст не поподает под условия.']]
    }
    if (currentType === 'Нельготная' || currentType === 'Сельская') {
        return [true, []]
    }

    if (currentType === 'Дальневосточная') {
        if (!(regionsDFO.includes(region))) {
            reasonsRejected.push('Вы должны быть проживать в следующих регионах: ' + regionsDFO.join(', '))
            isOk = false
        }
        if (!((family === 'Женат/замужем' && age <= 35) || (family === 'Холост' && children >= 1) || (work === 'Врач') || (work === 'Учитель'))) {
            reasonsRejected.push('Вы должны быть женаты/замужем и быть младше 35, или быть холосты и иметь ребенка, или быть врачом, или быть учителем.')
            isOk = false
        }
    }

    if (currentType === 'Семейная') {
        if (!(children >= 2 || childrenUnder6 >= 1)) {
            isOk = false
            reasonsRejected.push('Должно быть два ребенка до 18 лет или один ребенок (рожд. с 2019 г.).')
        }
    }

    if (currentType === 'IT') {
        if (work !== 'IT') {
            reasonsRejected.push('Вы должны работать в аккредитованной IT компании.')
            isOk = false
        }
        if (age > 50) {
            reasonsRejected.push('Вы должны быть младше 50 лет.')
            isOk = false
        }

    }

    if (currentType === 'Арктическая') {
        if (!(regionsArctika.includes(region))) {
            reasonsRejected.push('Вы должны быть проживать в следующих регионах: ' + regionsArctika.join(', '))
            isOk = false
        }
        if (!((family === 'Женат/замужем' && age <= 35) || (family === 'Холост' && children >= 1) || (work === 'Врач') || (work === 'Учитель'))) {
            reasonsRejected.push('Вы должны быть женаты/замужем и быть младше 35, или быть холосты и иметь ребенка, или быть врачом, или быть учителем.')
            isOk = false
        }
    }
    return [isOk, reasonsRejected]
}

export const checkFinNagruzka = (
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