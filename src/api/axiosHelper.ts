import axios, { AxiosResponse } from "axios";
import { IPromise } from "../typings";

export const BASE_URL = window.CONFIG.SERVER_URL + "/api";

export const _axiosGet = async <T>(
	url: string
): Promise<AxiosResponse<IPromise<T>>> => {
	return await axios.get(`${BASE_URL}` + url);
};

export const _axiosPost = async <T>(
	url: string,
	body: any
): Promise<AxiosResponse<IPromise<T>>> => {
	return await axios.post(`${BASE_URL}` + url, body);
};
