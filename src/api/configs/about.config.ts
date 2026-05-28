import axiosClient from "../axiosClient";
import type { AboutResponseDto } from "../dtos/about.response";
import { ABOUT_ENDPOINT } from "../endpoints/about.endpoint";
import { COMMON_ENDPOINT } from "./../endpoints/common.endpoint";

export const getAboutContent = async (): Promise<AboutResponseDto> => {
  const response = await axiosClient.get(COMMON_ENDPOINT, {
    url: ABOUT_ENDPOINT.GET_ABOUT_CONTENT,
  });
  return response.data;
};
