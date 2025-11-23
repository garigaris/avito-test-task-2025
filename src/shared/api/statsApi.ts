import { ActivityDataDTO, StatsPeriod, StatsPeriodParams, StatsSummaryDTO, DecisionsDataDTO, CategoriesStatsDTO, Moderator } from "../types/apiTypes";

import { api } from "./config/axiosInstance";

export const statsApi = {
  
  getStatsSummary: async (params?: StatsPeriodParams): Promise<StatsSummaryDTO> => {
    const { data } = await api.get<StatsSummaryDTO>('/v1/stats/summary', { 
      params 
    });
    return data;
  },

  getActivityChart: async (params?: StatsPeriodParams): Promise<ActivityDataDTO[]> => {
    const { data } = await api.get<ActivityDataDTO[]>('/v1/stats/chart/activity', { 
      params 
    });
    return data;
  },

  getDecisionsChart: async (params?: StatsPeriodParams): Promise<DecisionsDataDTO> => {
    const { data } = await api.get<DecisionsDataDTO>('/v1/stats/chart/decisions', { 
      params 
    });
    return data;
  },

  getCategoriesChart: async (params?: StatsPeriodParams): Promise<CategoriesStatsDTO> => {
    const { data } = await api.get<CategoriesStatsDTO>('/v1/stats/chart/categories', { 
      params 
    });
    return data;
  },

  getCurrentModerator: async (): Promise<Moderator> => {
    const { data } = await api.get<Moderator>('/v1/moderators/me');
    return data;
  }
}