import { useState, useEffect, useRef } from 'react';
import styles from './adsFilter.module.css';
import { statusLabels } from '../../utils/adFormatter';

const categories = [
  { id: 0, name: 'Электроника' },
  { id: 1, name: 'Недвижимость' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Работа' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Мода' },
  { id: 7, name: 'Детское' },
];

const FILTERS_KEY = 'adsFilters';

const AdsFilter = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedFilters = localStorage.getItem(FILTERS_KEY);
    if (savedFilters) {
      const { status, categoryId, minPrice, maxPrice, search } =
        JSON.parse(savedFilters);
      setStatus(status || []);
      setCategoryId(categoryId || '');
      setMinPrice(minPrice || '');
      setMaxPrice(maxPrice || '');
      setSearch(search || '');
      onFilterChange({ status, categoryId, minPrice, maxPrice, search });
    }
  }, [onFilterChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveFilters = (filters: any) => {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newStatus = status.includes(value)
      ? status.filter((s) => s !== value)
      : [...status, value];
    setStatus(newStatus);
    saveFilters({ status: newStatus, categoryId, minPrice, maxPrice, search });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
    saveFilters({
      status,
      categoryId: e.target.value,
      minPrice,
      maxPrice,
      search,
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
    saveFilters({
      status,
      categoryId,
      minPrice: e.target.value,
      maxPrice,
      search,
    });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
    saveFilters({
      status,
      categoryId,
      minPrice,
      maxPrice: e.target.value,
      search,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    saveFilters({
      status,
      categoryId,
      minPrice,
      maxPrice,
      search: e.target.value,
    });
  };

  const applyFilters = () => {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      alert('Минимальная цена не может быть больше максимальной');
      return;
    }
    onFilterChange({ status, categoryId, minPrice, maxPrice, search });
  };

  const handleReset = () => {
    const emptyFilters = {
      status: [],
      categoryId: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    };
    setStatus([]);
    setCategoryId('');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    localStorage.removeItem(FILTERS_KEY);
    onFilterChange(emptyFilters);
  };

  return (
    <div className={styles.adsFilter}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Статус:</label>
        <div className={styles.checkboxGroup}>
          {Object.entries(statusLabels).map(([value, label]) => (
            <label key={value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={value}
                checked={status.includes(value)}
                onChange={handleStatusChange}
                className={styles.checkbox}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Категория:</label>
        <select
          value={categoryId}
          onChange={handleCategoryChange}
          className={styles.select}
        >
          <option value="">Все</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Цена:</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            placeholder="Мин"
            value={minPrice}
            onChange={handleMinPriceChange}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Макс"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Поиск:</label>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Название объявления"
          value={search}
          onChange={handleSearchChange}
          className={styles.input}
        />
      </div>

      <div className={styles.buttons}>
        <button onClick={applyFilters} className={styles.applyButton}>
          Применить
        </button>
        <button onClick={handleReset} className={styles.resetButton}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default AdsFilter;
