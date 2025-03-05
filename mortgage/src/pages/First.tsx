
import { useNavigate } from "react-router-dom";

const First: React.FC = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/1')
    };


    return (
        <div className="container">
            <h1 className="site-title">Одобри Сам</h1>
            <button onClick={handleContinue} className="button">
                Начать тестирование
            </button>
        </div>
    );
};

export default First;
