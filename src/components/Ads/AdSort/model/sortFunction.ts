export type SortableFieldType = 'price' | 'createdAt' | 'urgent';
export type SortOrderType = 'asc' | 'desc';

export interface Ad {
  id: string | number;
  price?: number;
  createdAt?: string; 
  priority?: 'normal' | 'urgent';
  [key: string]: any;
}

export const sortFunction = (
  ads: Ad[],
  field: SortableFieldType,
  order: SortOrderType
): Ad[] => {
  return [...ads].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (field === 'urgent') {
      aValue = a.priority === 'urgent' ? 1 : 0;
      bValue = b.priority === 'urgent' ? 1 : 0;
    } else {
      aValue = a[field];
      bValue = b[field];
    }


    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;


    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (field === 'createdAt') {
        const aTime = new Date(aValue).getTime();
        const bTime = new Date(bValue).getTime();
        return order === 'asc' ? aTime - bTime : bTime - aTime;
      }
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

  
    if (field === 'urgent') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
};