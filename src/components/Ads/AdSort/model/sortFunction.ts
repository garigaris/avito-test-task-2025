export type SortableFieldType = 'price' | 'createdAt' | 'urgent';
export type SortOrderType = 'asc' | 'desc';

export interface Ad {
  id: string | number;
  price?: number;
  createdAt?: string; // ISO дата
  urgent?: boolean;
  [key: string]: any;
}

export const sortFunction = (
  ads: Ad[],
  field: SortableFieldType,
  order: SortOrderType
): Ad[] => {
  return [...ads].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // Обработка null или undefined
    if (aValue == null && bValue != null) return 1;
    if (aValue != null && bValue == null) return -1;
    if (aValue == null && bValue == null) return 0;

    // Числа
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Строки (например, createdAt)
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      // Если поле даты, преобразуем в timestamp
      if (field === 'createdAt') {
        const aTime = new Date(aValue).getTime();
        const bTime = new Date(bValue).getTime();
        return order === 'asc' ? aTime - bTime : bTime - aTime;
      }
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    // Булевы значения (urgent)
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return order === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    }

    // fallback
    return 0;
  });
};
