import AdItem from '../../AdListItem/ui/AdItem';
import styles from './adsList.module.css';



const AdsList = ({ adsData, isLoading, isError, refetch, page, totalPages, nextPage, prevPage }) => {
  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div>
        <p>Не удалось загрузить объявления. Попробуйте снова.</p>
        <button onClick={() => refetch()}>Попробовать снова</button>
      </div>
    );
  }
  
  return (
    <div>
      <h2>Список объявлений</h2>
      <ul className={styles.AdsListContainer}>
        {adsData?.map((ad) => (
          <AdItem key={ad.id} {...ad} />
        ))}
      </ul>

          
    </div>
  );
};

export default AdsList;
