import React from "react";
import QuestionCard from "../components/QuestionCard";

const QuestionSalaryConf: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Да', 'Нет']}
            questionText='Есть ли подтверждение дохода?'
            answerId={'salaryConf'}
            navigatePath={'/percent'}
        />
    );
};

export default QuestionSalaryConf;


