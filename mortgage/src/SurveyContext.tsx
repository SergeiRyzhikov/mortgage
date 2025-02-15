import React, { createContext, useContext, useState } from "react";

interface SurveyContextProps {
  answers: Record<string, string>;
  updateAnswer: (question: string, answer: string) => void;
  clearAnswers: () => void; // Добавляем тип для новой функции
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const updateAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const clearAnswers = () => {
    setAnswers({}); // Очищаем все ответы
  };

  return (
    <SurveyContext.Provider value={{ answers, updateAnswer, clearAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};
