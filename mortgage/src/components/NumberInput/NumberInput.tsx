import React, { useState } from "react";
import styles from "./NumberInput.module.css";

function formatMoney(value: number): string {
    return value.toLocaleString('ru-RU');
}

type NumberInputProps = {
    min: number;
    max: number;
    label: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

const NumberInput: React.FC<NumberInputProps> = ({ min, max, label, value, setValue }) => {
    const [displayValue, setDisplayValue] = useState(formatMoney(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\s/g, "");
        if (/^\d*$/.test(rawValue)) {
            let newValue = Math.max(min, Math.min(max, Number(rawValue)));
            setValue(newValue);
            setDisplayValue(formatMoney(newValue));
        }
    };

    return (
        <label className={styles.label}>
            {label}
            <input
                value={displayValue}
                onChange={handleChange}
                className={styles.input}
            />
        </label>
    );
};

export default NumberInput;
