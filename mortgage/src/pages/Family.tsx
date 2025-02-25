import React, { } from "react";
import QuestionCard from "../components/QuestionCard";

const Family: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Женат/замужем', 'Холост']}
            questionText='11. Ваше семейное положение'
            answerId={'family'}
            navigatePath={'/12'}
        />
    );
};

export default Family;
