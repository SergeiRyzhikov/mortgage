import React from "react";
import QuestionCard from "../components/QuestionCard";

const Question3: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Да', 'Нет']}
            questionText='5. Есть ли у Вас исполнительные производства в ФССП?'
            answerId={'FSSP'}
            navigatePath={'/6'}
        />
    );
};

export default Question3;
