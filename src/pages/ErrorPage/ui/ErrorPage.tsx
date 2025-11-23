import styles from "./ErrorPage.module.css";
import Header from "../../../components/Header/Header";

export const ErrorPage = () => {
  return (
    <>
    <Header />
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Страница не найдена</h1>
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={() => window.history.back()}
          >
            Вернуться назад
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => (window.location.href = "/")}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

