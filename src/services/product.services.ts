import AXIOS from "@/axios/axiosClient";
import { CITY_ID } from "@/constants/city";

export const PROPERTY = {
  getCategories: () => AXIOS.get(`/v1/user/categories`),
  getAreaDropdown: () =>
    AXIOS.get(`/v1/customer/dropdown/area?city_id=${CITY_ID}`),
  getGroupNames: (data: any) =>
    AXIOS.get(`/v1/customer/group-name`, {
      params: data,
    }),
  getList: (
    queryParams: Record<string, any>,
    payload: Record<string, any> = {},
  ) =>
    AXIOS.post(`/v1/customer/home-search`, payload, {
      params: queryParams,
    }),
};
