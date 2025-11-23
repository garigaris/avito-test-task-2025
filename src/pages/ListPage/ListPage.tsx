import { useState, useEffect, useMemo, useCallback } from 'react';
import AdsList from '../../components/Ads/AdList/ui/adsList';
import AdsFilter from '../../components/Ads/AdFilter/ui/adsFilter';
import AdsSort from '../../components/Ads/AdSort/ui/adSort';
import { ListPagination } from '../../components/Ads/AdListPagination/ui/ListPagination';
import { useAds } from '../../shared/api/hooks/Ads/useGetAds';
import { useAppContext } from '../../app/context/AppContext';

import {
  sortFunction,
  SortableFieldType,
  SortOrderType,
  Ad,
} from '../../components/Ads/AdSort/model/sortFunction';
import { usePagination } from '../../shared/hooks/usePagination';


interface AdsFilters {
  status: string | null;
  categoryId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string | null;
}

export const ListPage = () => {
  const pageSize = 10;
  const { setTotalItems, setFilteredIds } = useAppContext();

  const [filters, setFilters] = useState<AdsFilters>({
    status: null,
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    search: null,
  });

  const { data, isLoading, isError, refetch } = useAds({
    page: 1,
    limit: 1000, 
    ...filters,
  });

  const [sortBy, setSortBy] = useState<SortableFieldType>('price');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

  const sortedAds: Ad[] = useMemo(() => {
    if (!data?.ads) return [];
    return sortFunction(data.ads, sortBy, sortOrder);
  }, [data?.ads, sortBy, sortOrder]);

  const { CurrentPageNumber, setPage, totalPages, currentPageData, nextPage, prevPage } =
    usePagination({ data: sortedAds, pageSize });

  useEffect(() => {
    if (sortedAds.length > 0) {
      setTotalItems(sortedAds.length);
      const ids = sortedAds.map((ad) => Number(ad.id));
      setFilteredIds(ids);
    }
  }, [sortedAds, setTotalItems, setFilteredIds]);


  const handleFilterChange = useCallback((newFilters: Partial<AdsFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setPage(1);
  }, [setPage]);

  const handleSortChange = useCallback(
    (field: SortableFieldType) => {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(field);
        setSortOrder('asc');
      }
      setPage(1); 
    },
    [sortBy, setPage]
  );

  return (
    <>
      <AdsFilter onFilterChange={handleFilterChange} />

      <AdsSort
        setPage={setPage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      <AdsList
        adsData={currentPageData}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        page={CurrentPageNumber}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
      />

      <ListPagination
        totalPages={totalPages}
        page={CurrentPageNumber}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
};
