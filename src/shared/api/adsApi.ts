import { api } from './config/axiosInstance';
import {
  AdDTO,
  AdsResponse,
  RejectAdRequest,
  RequestChangesRequest,
  ModerationResponse,
  AdsParametersGetType,
} from '../types/apiTypes';

export const adsApi = {
  getAds: async (params?: AdsParametersGetType): Promise<AdsResponse> => {
    const { data } = await api.get<AdsResponse>('/v1/ads', { params });
    return data;
  },
  getAd: async (id: number): Promise<AdDTO> => {
    const { data } = await api.get<AdDTO>(`/v1/ads/${id}`);
    return data;
  },

  approveAd: async (id: number): Promise<ModerationResponse> => {
    const { data } = await api.post<ModerationResponse>(
      `/v1/ads/${id}/approve`
    );
    return data;
  },
  rejectAd: async (
    id: number,
    request: RejectAdRequest
  ): Promise<ModerationResponse> => {
    const { data } = await api.post<ModerationResponse>(
      `/v1/ads/${id}/reject`,
      request
    );
    return data;
  },
  requestChanges: async (
    id: number,
    request: RequestChangesRequest
  ): Promise<ModerationResponse> => {
    const { data } = await api.post<ModerationResponse>(
      `/v1/ads/${id}/request-changes`,
      request
    );
    return data;
  },
};
