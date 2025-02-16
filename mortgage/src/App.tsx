import React from "react";
import { Route, Routes } from "react-router-dom";
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
import Question14 from "./pages/Question14";
import Question15 from "./pages/Question15";
import Question16 from "./pages/Question16";
import Question17 from "./pages/Question17";
import Question18 from "./pages/Question18";
import Result from "./pages/Result";
import Extra9 from "./pages/Extra9";
import First from "./pages/First";
import Extra3_1 from "./pages/Extra3_1";

const App: React.FC = () => {
  return (
    <SurveyProvider>
        <Routes>
          <Route path="/" element={<First />} />
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
          <Route path="/14" element={<Question14 />} />
          <Route path="/15" element={<Question15 />} />
          <Route path="/16" element={<Question16 />} />
          <Route path="/17" element={<Question17 />} />
          <Route path="/18" element={<Question18 />} />
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
          <Route path="/extra9" element={<Extra9 />} />
          {/* Другие маршруты можно добавлять здесь */}
        </Routes>
    </SurveyProvider>
  );
};

export default App;