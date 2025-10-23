import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, className }) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;