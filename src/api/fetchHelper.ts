import { IPromise } from "../typings";

const { SERVER_URL } = window.CONFIG;

export const _get = async <T>(url: string): Promise<IPromise<T>> => {
	const res = await fetch(SERVER_URL + url);
	return await res.json();
};

export const _post = async <T>(
	url: string,
	body: any
): Promise<IPromise<T>> => {
	const res = await fetch(SERVER_URL + url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	return await res.json();
};
