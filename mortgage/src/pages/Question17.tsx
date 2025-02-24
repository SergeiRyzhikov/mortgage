import React from "react";
import QuestionCard from "../components/QuestionCard";

const Question17: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Высшее', 'Среднее специальное', 'Среднее техническое', 'Основное общее']}
            questionText='17. Образование'
            answerId={'17'}
            navigatePath={'/18'}
        />
    );
};

export default Question17;
