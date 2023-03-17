import { instance } from "@/src/api/api.interceptor";
import { IOrder } from "../types/order.interface";

export const ORDER = "order";

export const OrderService = {
  async getAll() {
    return instance<IOrder[]>({
      url: ORDER,
      method: "GET",
    });
  },

};
