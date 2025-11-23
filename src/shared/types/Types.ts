export interface GetAdsParams {
  page?: number;
  limit?: number;
  status?: string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'createdAt' | 'price' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export interface FiltersType {
  status?: string[];       
  categoryId?: string;    
  minPrice?: string;       
  maxPrice?: string;      
  search?: string;         
}
