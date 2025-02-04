import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MortgageSelection from "./pages/MortgageSelection";
import './App.css'
import Question1 from "./pages/Question1";
import { SurveyProvider } from "./SurveyContext";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import UploadCreditHistory from "./pages/UploadCreditHistory";
import Extra1 from "./pages/Extra1";
import Extra2 from "./pages/Extra2";
import Extra3 from "./pages/Extra3";
import Extra4 from "./pages/Extra4";
import Extra5 from "./pages/Extra5";
import Extra6 from "./pages/Extra6";
import Extra7 from "./pages/Extra7";
import Extra8 from "./pages/Extra8";
import Question5 from "./pages/Question5";
import Question6 from "./pages/Question6";
import Question7 from "./pages/Question7";
import Question8 from "./pages/Question8";
import Question9 from "./pages/Question9";
import Question10 from "./pages/Question10";
import Question11 from "./pages/Question11";
import Question12 from "./pages/Question12";

const App: React.FC = () => {
  return (
    <SurveyProvider>
      <Router>
        <Routes>
          
          <Route path="/1" element={<Question1 />} />
          <Route path="/2" element={<Question2 />} />
          <Route path="/3" element={<Question3 />} />
          <Route path="/4" element={<UploadCreditHistory />} />
          <Route path="/5" element={<Question5 />} />
          <Route path="/6" element={<Question6 />} />
          <Route path="/7" element={<Question7 />} />
          <Route path="/8" element={<Question8 />} />
          <Route path="/9" element={<Question9 />} />
          <Route path="/10" element={<Question10 />} />
          <Route path="/11" element={<Question11 />} />
          <Route path="/12" element={<Question12 />} />
          <Route path="/13" element={<MortgageSelection />} />
          <Route path="/extra1" element={<Extra1 />} />
          <Route path="/extra2" element={<Extra2 />} />
          <Route path="/extra3" element={<Extra3 />} />
          <Route path="/extra4" element={<Extra4 />} />
          <Route path="/extra5" element={<Extra5 />} />
          <Route path="/extra6" element={<Extra6 />} />
          <Route path="/extra7" element={<Extra7 />} />
          <Route path="/extra8" element={<Extra8 />} />
          {/* Другие маршруты можно добавлять здесь */}
        </Routes>
      </Router>
    </SurveyProvider>
  );
};

export default App;
// 3 вопрос
// error message
// полностью покртыие
// спросить про вид и git


// Вопросы в анкете:
// Есть ли у Вас судимость? (Да/Нет). Если да, то надо спросить, по экономической ли статье
// Являетесь ли Вы зарплатником банка? (Желательно знать какого)
// Есть ли у Вас исполнительные производства в ФССП? (Да/Нет)
// Загрузите, пожалуйста, свою кредитную историю (PDF-файл с кредитной историей)
// Скоринговый балл
// Дата рождения
// Семейное положение
// Количество детей, указанное в паспорте
// Являетесь ли резидентом РФ? (Да/Нет)
// Укажите свою заработную плату в месяц (Её тип и сумму):
// официальная
// неофициальная
// комбинированная
// Стаж работы на последнем месте. С какой даты?
// Сфера деятельности:
// учитель
// врач
// IT
// ИП (потребуется справка по форме банка)
// государственная компания
// прочее
// Вид кредита:
// ипотека
// потребительский кредит
// автокредит
// микрозайм
// Дата рождения ребёнка (каждого)
// Регион, где планируете взять ипотеку
// Наличие машины или квартиры, дома или земельного участка
// Образование:
// высшее
// среднее специальное
// среднее техническое
// среднее общее
// основное общее
// Есть ли иждивенцы?
// Текущая финансовая нагрузка (если не указал кредитную историю, то указывает тут сам):
// Считаем все лимиты по кредитным картам, берём от них 10%
// Сумма всех текущих платежей по всем кредитам
// Прибавить за каждого взрослого 20к, за каждого ребёнка 18к
// Умножаем это на 2 и получаем фин. нагрузку
// Есть ли действующая просрочка?