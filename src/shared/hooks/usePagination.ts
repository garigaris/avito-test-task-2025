import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  pageSize: number;
}

export const usePagination = <T>({ data, pageSize }: UsePaginationProps<T>) => {
  const [CurrentPageNumber, setPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data.length, pageSize]);

  const currentPageData = useMemo(() => {
    const startIndex = (CurrentPageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, CurrentPageNumber, pageSize]);

  const nextPage = useCallback(() => {
    setPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((p: number) => {
    const newPage = Math.max(1, Math.min(p, totalPages));
    setPage(CurrentPageNumber);
  }, [totalPages]);

  return {
    CurrentPageNumber,
    setPage,
    totalPages,
    currentPageData,
    nextPage,
    prevPage,
    goToPage,
  };
};
