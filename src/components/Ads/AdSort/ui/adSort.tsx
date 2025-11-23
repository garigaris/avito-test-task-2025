import React from 'react';
import styles from './adsSort.module.css';
import { SortableFieldType, SortOrderType } from '../model/sortFunction';

interface AdsSortProps {
  sortBy: SortableFieldType;
  sortOrder: SortOrderType;
  setPage: (startPage: number) => void;
  onSortChange: (field: SortableFieldType) => void;
}

const AdsSort: React.FC<AdsSortProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  setPage,
}) => {
  const fields: { label: string; key: SortableFieldType }[] = [
    { label: 'Цена', key: 'price' },
    { label: 'Время', key: 'createdAt' },
    { label: 'Срочно', key: 'urgent' },
  ];

  return (
    <div className={styles.container}>
      <span className={styles.label}>Сортировать по:</span>
      {fields.map((field) => (
        <button
          key={field.key}
          className={`${styles.button} ${sortBy === field.key ? styles.active : ''}`}
          onClick={() => {
            onSortChange(field.key);
            setPage(1);
          }}
        >
          {field.label}{' '}
          {sortBy === field.key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
      ))}
    </div>
  );
};

export default AdsSort;