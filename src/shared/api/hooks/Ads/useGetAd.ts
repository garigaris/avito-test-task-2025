import { useQuery } from '@tanstack/react-query';

import { adsApi } from '../../adsApi';

export const useGetAd = (id: number | null | undefined) => {
    return useQuery({
        queryKey: ['ad', id],
        queryFn: () => adsApi.getAd(id!),
        enabled: !!id,
    })

}

