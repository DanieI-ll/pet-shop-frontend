import styles from './AppButton.module.css';

export default function AppButton({ text, className, handleClick, isActive }) {
  return (
    <button
      className={`${styles.button} ${className} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

