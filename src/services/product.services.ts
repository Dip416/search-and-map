import AXIOS from "@/axios/axiosClient";
import { CITY_ID } from "@/constants/city";

export const PROPERTY = {
  getCategories: () => AXIOS.get(`/user/categories`),
  getAreaDropdown: () =>
    AXIOS.get(`/customer/dropdown/area?city_id=${CITY_ID}`),
  getGroupNames: (data: any) =>
    AXIOS.get(`/customer/group-name`, {
      params: data,
    }),
  getList: (
    queryParams: Record<string, any>,
    payload: Record<string, any> = {},
  ) =>
    AXIOS.post(`/customer/home-search`, payload, {
      params: queryParams,
    }),
};
