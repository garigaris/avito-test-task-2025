import { adsApi } from "../../adsApi";
import { useQuery } from "@tanstack/react-query";

export const useAds = ({
  page = 1,
  limit = 150,
  status,
  categoryId,
  minPrice,
  maxPrice,
  search,
}) => {
  const queryKey = [
    'ads',
    page,
    limit,
    status,
    categoryId,
    minPrice,
    maxPrice,
    search,

  ];

  const options = {
    queryKey,
    queryFn: () =>
      adsApi.getAds({
        page,
        limit,
        status,
        categoryId,
        minPrice,
        maxPrice,
        search,
      }),
    staleTime: 60_000,
    retry: 1,
  };

  return useQuery(options);
};
