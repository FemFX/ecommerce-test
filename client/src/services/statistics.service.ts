import { instance } from "@/src/api/api.interceptor";

export const STATISTICS = "statistics";

export type TypeStatisticsResponse = {
  name: string;
  value: number;
}[];

export const StatisticsService = {
  async getMain() {
    return instance<TypeStatisticsResponse>({
      url: `${STATISTICS}/main`,
      method: "GET",
    });
  },
};
