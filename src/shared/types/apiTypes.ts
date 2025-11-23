// types/apiTypes.ts

// Базовые типы для объявлений
export interface Seller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

export interface Characteristics {
  [key: string]: string;
}

export interface ModerationHistoryItem {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: 'approved' | 'rejected' | 'requestChanges';
  reason: string | null;
  comment: string;
  timestamp: string;
}


export interface AdDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: 'approved' | 'rejected' | 'pending' | 'draft';
  priority: 'normal' | 'urgent';
  createdAt: string;
  updatedAt: string;
  images: string[];
  seller: Seller;
  characteristics: Characteristics;
  moderationHistory: ModerationHistoryItem[];
}

export interface PaginationDTO {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface AdsResponse {
  ads: AdDTO[];
  pagination: PaginationDTO;
}

export interface AdsParametersGetType {
  page?: number;
  limit?: number;
  status?: string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  priority?: 'normal' | 'urgent';
  sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'price';
  sortOrder?: 'asc' | 'desc';
}

// Типы для модерации
export type RejectionReason = 
  | 'Запрещенный товар'
  | 'Неверная категория'
  | 'Некорректное описание'
  | 'Проблемы с фото'
  | 'Подозрение на мошенничество'
  | 'Другое';

export type ChangesRequestReason = RejectionReason;

export interface RejectAdRequest {
  reason: RejectionReason;
  comment?: string;
}

export interface RequestChangesRequest {
  reason: ChangesRequestReason;
  comment?: string;
}

export interface ModerationResponse {
  message: string;
  ad: AdDTO;
}

// Типы для статистики
export type StatsPeriod = 'today' | 'week' | 'month' | 'custom';

export interface StatsPeriodParams {
  period?: StatsPeriod;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface StatsSummaryDTO {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityDataDTO {
  date: string; // YYYY-MM-DD
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsDataDTO {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface CategoriesStatsDTO {
  [category: string]: number;
}

// Типы для модераторов
export interface ModeratorStats {
  totalReviewed: number;
  todayReviewed: number;
  thisWeekReviewed: number;
  thisMonthReviewed: number;
  averageReviewTime: number;
  approvalRate: number;
}

export interface Moderator {
  id: number;
  name: string;
  email: string;
  role: string;
  statistics: ModeratorStats;
  permissions: string[];
}

// Типы для ответов ошибок
export interface ErrorResponse {
  error: string;
  message?: string;
  id?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft';
export type AdPriority = 'normal' | 'urgent';
export type ModerationAction = 'approved' | 'rejected' | 'requestChanges';