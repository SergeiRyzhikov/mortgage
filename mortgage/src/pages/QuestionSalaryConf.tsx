import React from "react";
import QuestionCard from "../components/QuestionCard";

const QuestionSalaryConf: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Да', 'Нет']}
            questionText='13.1 Есть ли подтверждение дохода?'
            answerId={'salaryConf'}
            navigatePath={'/percent'}
        />
    );
};

export default QuestionSalaryConf;


