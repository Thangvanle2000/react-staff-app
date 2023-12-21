"use client";
import { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";

export const authApi: any = {
  async getUser(): Promise<AxiosResponse<any>> {
    const url: string = "/user";
    return axiosClient.get(url);
  },
  async getDetailUser(id: any): Promise<AxiosResponse<any>> {
    const url: string = `/user/${id}/detail`;
    return axiosClient.get(url);
  },
  async postUser(data: any): Promise<AxiosResponse<any>> {
    const url: string = "/user";
    return axiosClient.post(url, data);
  },
  async updateUser(id: any, data: any): Promise<AxiosResponse<any>> {
    const url: string = `/user/${id}/update`;
    return axiosClient.put(url, data);
  },

  async deleteUser(id: any): Promise<AxiosResponse<any>> {
    const url: string = `/user/${id}/delete`;
    return axiosClient.delete(url);
  },
};
