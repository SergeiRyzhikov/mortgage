import React from "react";
import QuestionCard from "../components/QuestionCard";

const Education: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Высшее', 'Среднее специальное', 'Среднее техническое', 'Основное общее']}
            questionText='18. Образование'
            answerId={'education'}
            navigatePath={'/19'}
        />
    );
};

export default Education;
