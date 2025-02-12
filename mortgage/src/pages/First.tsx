
import { useNavigate } from "react-router-dom";

const First: React.FC = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/1')
    };


    return (
        <div className="container">
            <button onClick={handleContinue} className="button">
                Начать прохождение анкеты
            </button>
        </div>
    );
};

export default First;
