import { AdDTO , ModerationAction} from '../../../shared/types/apiTypes';

export const statusLabels: Record<AdDTO['status'], string> = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  pending: 'На модерации',
  draft: 'На доработке',
};

export const ModerationActionLabels: Record<ModerationAction, string> = {
  approved: "Одобрено",
  rejected: "Отклонено", 
  requestChanges: "Возвращено на доработку"
};


export const priorityLabels: Record<AdDTO['priority'], string> = {
  urgent: 'Срочно',
  normal: 'Обычно',
};

export const formatCategory = (category: string) =>
  category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(price);

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

export const getStatusClass = (status: AdDTO['status'], styles: any) => {
  switch (status) {
    case 'approved':
      return styles.statusApproved;
    case 'rejected':
      return styles.statusRejected;
    case 'pending':
      return styles.statusPending;
    default:
      return '';
  }
};

export const getPriorityClass = (priority: AdDTO['priority'], styles: any) =>
  priority === 'urgent' ? styles.priorityUrgent : styles.priorityNormal;
