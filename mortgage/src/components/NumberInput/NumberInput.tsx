import React from "react";
import styles from "./NumberInput.module.css";

type NumberInputProps = {
    min: number;
    max: number;
    label: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

const Card: React.FC<NumberInputProps> = ({ min, max, label, value, setValue }) => {
    const setNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d+$/.test(e.target.value) || e.target.value==='') {
            let newValue = Math.max(min, Math.min(max, Number(e.target.value)));
            setValue(newValue)
        }
    }
    
    return (
        <label className={styles.label}>
            {label}
            <input
                value={value}
                onChange={setNumber}
                className={styles.input}
            />
        </label>
    );
};

export default Card;
