import React from "react";
import { Route, Routes } from "react-router-dom";
import MortgageSelection from "./pages/MortgageSelection";
import './App.css'
import Judge from "./pages/Judge";
import { SurveyProvider } from "./SurveyContext";
import BankSalaryman from "./pages/BankSalaryman";
import FSSP from "./pages/FSSP";
import Pdf from "./pages/Pdf";
import Extra1 from "./pages/Extra1";
import Extra2 from "./pages/Extra2";
import Extra3 from "./pages/Extra3";
import Extra4 from "./pages/Extra4";
import Extra5 from "./pages/Extra5";
import Extra6 from "./pages/Extra6";
import Extra7 from "./pages/Extra7";
import Extra8 from "./pages/Extra8";
import DateBirth from "./pages/DateBirth";
import Family from "./pages/Family";
import AmountChildren from "./pages/AmountChildren";
import Resident from "./pages/Resident";
import Salary from "./pages/Salary";
import Experience from "./pages/Experience";
import Work from "./pages/Work";
import ChildrenBirth from "./pages/ChildrenBirth";
import Region from "./pages/Region";
import Availability from "./pages/Availability";
import Education from "./pages/Education";
import AmountDependents from "./pages/AmountDependents";
import Result from "./pages/Result";
import CreditScore from "./pages/CreditScore";
import First from "./pages/First";
import Extra3_1 from "./pages/Extra3_1";
import QuestionSalaryConf from "./pages/QuestionSalaryConf";
import QuestionPercent from "./pages/QuestionPercent";
import GlobalCreditScore from "./pages/GlobalCreditScore";
// import QuestionCard from "./components/QuestionCard";

const App: React.FC = () => {
  return (
    <SurveyProvider>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/1" element={<MortgageSelection />} />
        <Route path="/2" element={<Region />} />
        <Route path="/3" element={<Resident />} />
        <Route path="/4" element={<Judge />} />
        <Route path="/5" element={<FSSP />} />
        <Route path="/6" element={<BankSalaryman />} />
        <Route path="/7" element={<GlobalCreditScore />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/creditScore" element={<CreditScore />} />
        {/* <Route path="/8" element={<Question8 />} />

        <Route path="/9" element={<Question9 />} /> */}
        <Route path="/10" element={<DateBirth />} />
        <Route path="/11" element={<Family />} />
        <Route path="/12" element={<AmountChildren />} />
        <Route path="/13" element={<ChildrenBirth />} />
        <Route path="/14" element={<AmountDependents />} />
        <Route path="/15" element={<Salary />} />
        <Route path="/16" element={<Experience />} />
        <Route path="/17" element={<Work />} />
        <Route path="/18" element={<Education />} />
        <Route path="/19" element={<Availability />} />
        <Route path="/result" element={<Result />} />
        <Route path="/extra1" element={<Extra1 />} />
        <Route path="/extra2" element={<Extra2 />} />
        <Route path="/extra3" element={<Extra3 />} />
        <Route path="/extra3_1" element={<Extra3_1 />} />
        <Route path="/extra4" element={<Extra4 />} />
        <Route path="/extra5" element={<Extra5 />} />
        <Route path="/extra6" element={<Extra6 />} />
        <Route path="/extra7" element={<Extra7 />} />
        <Route path="/extra8" element={<Extra8 />} />
        <Route path="/salaryConf" element={<QuestionSalaryConf />} />
        <Route path="/percent" element={<QuestionPercent />} />
        {/* Другие маршруты можно добавлять здесь */}
      </Routes>
    </SurveyProvider>
  );
};

export default App;