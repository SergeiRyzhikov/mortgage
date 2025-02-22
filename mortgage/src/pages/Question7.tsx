import React, { } from "react";
import QuestionCard from "../components/QuestionCard";

const Question7: React.FC = () => {
    return (
        <QuestionCard
            choiceTypes={['Женат/замужем', 'Один']}
            questionText='7. Ваше семейное положение'
            answerId={'7'}
            navigatePath={'/8'}
        />
    );
};

export default Question7;
