import axiosClient from "../axiosClient";
import type { AboutResponseDto } from "../dtos/about.response";
import type { ServiceResponseDto } from "../dtos/service.response";
import {
  COMMON_ENDPOINT,
  CONTENT_ENDPOINTS,
} from "./../endpoints/common.endpoint";

export const getAboutContent = async (): Promise<AboutResponseDto> => {
  const response = await axiosClient.get(COMMON_ENDPOINT, {
    params: {
      url: CONTENT_ENDPOINTS.GET_ABOUT_CONTENT,
    },
  });
  return response.data.data;
};

export const getServiceContent = async (): Promise<ServiceResponseDto> => {
  const response = await axiosClient.get(COMMON_ENDPOINT, {
    params: {
      url: CONTENT_ENDPOINTS.GET_SERIVICE_CONTENT,
    },
  });
  return response.data.data;
};
