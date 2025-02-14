import React from "react";
import styles from "./Error.module.css";

type ErrorProps = {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>
};

const Error: React.FC<ErrorProps> = ({ message, setMessage }) => {
  // const [isVisible, setIsVisible] = useState(true);

  if (!message) return null;

  return (
    <div className={styles.overlay} onClick={() => setMessage(null)}>
      <div className={styles.errorBox}>{message}</div>
    </div>
  );
};

export default Error;
