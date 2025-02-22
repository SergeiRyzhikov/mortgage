import React from "react";
import QuestionCard from "../components/QuestionCard";

const Question3: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Да', 'Нет']}
            questionText='3. Есть ли у Вас исполнительные производства в ФССП?'
            answerId={'3'}
            navigatePath={'/4'}
        />
    );
};

export default Question3;
