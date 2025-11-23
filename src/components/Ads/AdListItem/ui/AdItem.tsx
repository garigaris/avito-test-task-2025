import { AdDTO } from '../../../../shared/types/apiTypes';
import { Link } from 'react-router-dom';
import styles from './AdItem.module.css';
import { statusLabels, priorityLabels, formatCategory, 
         formatPrice, formatDate, getStatusClass,
         getPriorityClass,} from '../../utils/adFormatter';


const AdItem = (props: AdDTO) => {
  
  const {id, title, category, price, status, priority, createdAt, images } = props;

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={title || 'Изображение объявления'}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>Нет изображения</span>
          </div>
        )}

        <div className={`${styles.priorityBadge} ${getPriorityClass(priority, styles)}`}>
          {priorityLabels[priority]}
        </div>

      </div>

      <div className={styles.content}>

        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.price}>{formatPrice(price)}</div>
        </div>

        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Категория:</span>
            <span className={styles.metaValue}>{formatCategory(category)}</span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Статус:</span>
            <span className={`${styles.status} ${getStatusClass(status, styles)}`}>
              {statusLabels[status]}
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Создано:</span>
            <span className={styles.date}>{formatDate(createdAt)}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to={`/item/${id}`} className={styles.toItem}>Открыть</Link>
        </div>
      </div>
    </div>
  );
};

export default AdItem;
