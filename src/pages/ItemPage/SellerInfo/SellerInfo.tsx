
import styles from './SellerInfo.module.css';

interface Seller {
  name: string;
  totalAds: number;
  rating: string; 
  registeredAt: string;
}

interface SellerInfoProps {
  seller: Seller;
}

export const SellerInfo = ({ seller }: SellerInfoProps) => {
  const getSellerInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className={styles.sellerInfo}>
      <h3 className={styles.sectionTitle}>Продавец</h3>
      <div className={styles.sellerHeader}>
        <div className={styles.sellerAvatar}>
          {getSellerInitials(seller?.name || 'Пользователь')}
        </div>
        <div className={styles.sellerName}>{seller?.name || 'Пользователь'}</div>
      </div>
      
      <div className={styles.sellerStats}>
        <div className={styles.sellerStat}>
          <span className={styles.statLabel}>Объявлений:</span>
          <span className={styles.statValue}>{seller?.totalAds || 0}</span>
        </div>
        <div className={styles.sellerStat}>
          <span className={styles.statLabel}>Рейтинг:</span>
          <span className={styles.statValue}>{seller.rating}</span>
        </div>
        <div className={styles.sellerStat}>
          <span className={styles.statLabel}>Регистрация:</span>
          <span className={styles.statValue}>
            {new Date(seller.registeredAt).toLocaleDateString('ru-RU')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;