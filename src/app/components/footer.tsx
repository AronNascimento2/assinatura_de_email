import styles from "../styles/Footer.module.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        Copyright © Unicargo 2025 - {currentYear}. Todos os direitos reservados.
      </p>
    </footer>
  );
};
