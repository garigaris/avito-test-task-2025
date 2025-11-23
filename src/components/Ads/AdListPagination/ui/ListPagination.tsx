import styles from './ListPagination.module.css';
import { useAppContext } from '../../../../app/context/AppContext';

interface ListPaginationProps {
  totalPages: number;
  page: number;
  prevPage: () => void;
  nextPage: () => void;
}

export const ListPagination: React.FC<ListPaginationProps> = ({
  totalPages,
  page,
  prevPage,
  nextPage,
}) => {
  const { totalItems } = useAppContext();

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationButtons}>
        <button
          className={styles.button}
          onClick={prevPage} 
          disabled={page === 1}
        >
          Предыдущая
        </button>

        <span className={styles.pageInfo}>
          {page} / {totalPages}
        </span>

        <button
          className={styles.button}
          onClick={nextPage} 
          disabled={page === totalPages || totalPages === 0}
        >
          Следующая
        </button>
      </div>

      <div className={styles.totalItems}>
        Всего объявлений: {totalItems ?? 0}
      </div>
    </div>
  );
};
