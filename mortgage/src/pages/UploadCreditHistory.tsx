import React, { useState } from "react";
import "../styles/UploadCreditHistory.css";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../SurveyContext";
import Card from "../components/Card/Card";

const UploadCreditHistory: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const { answers, updateAnswer } = useSurvey();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            if (selectedFile.type !== "application/pdf") {
                setFile(null);
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = () => {
        if (!file) {
            updateAnswer('4', '')
            navigate('/extra1')
            return;
        }
        // Логика обработки файла
        console.log("Файл загружен:", file.name);
    };

    return (
        <div className="container" >
            <h1 className="title">Анкета</h1>
            <div className="question">
                <p className="question-text">4. Загрузите PDF-файл кредитной истории, если его нет, также жмите продолжить</p>
                <label className="custom-file-upload">
                    <input type="file" accept="application/pdf" onChange={handleFileChange} />
                    {file ?
                        `${file.name}` :
                        'Выбрать файл'
                    }
                </label>

                {/* {file && <p className="file-name">Выбранный файл: {file.name}</p>} */}
            </div>
            <button onClick={handleUpload} className="button">Продолжить</button>
        </div>
    );
};

export default UploadCreditHistory;
