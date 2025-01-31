import React from "react";
import styles from "./Card.module.css";

type CardProps = {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ isSelected, onClick, children }) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
