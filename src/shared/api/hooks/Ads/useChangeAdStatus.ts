import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adsApi } from '../../adsApi';
import { RejectionReason } from '../../../types/apiTypes';

export const useApproveAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => adsApi.approveAd(id),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['ad', id] });
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
};

export const useRejectAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      reason,
      comment,
    }: {
      id: number;
      reason: RejectionReason;
      comment?: string;
    }) => adsApi.rejectAd(id, { reason, comment }),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['ad', id] });
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
};

export const useRequestChanges = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      reason,
      comment,
    }: {
      id: number;
      reason: RejectionReason;
      comment?: string;
    }) => adsApi.requestChanges(id, { reason, comment }),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['ad', id] });
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
};
