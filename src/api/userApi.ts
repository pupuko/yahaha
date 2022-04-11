import { IAvatar, ILogin, IRegister, IUser } from "../typings";
import { _axiosGet, _axiosPost } from "./axiosHelper";
import { _post } from "./fetchHelper";

const USER_PATH = "/user";

const UserApi = {
	register: async (body: ILogin) => {
		const { data } = await _axiosPost<IUser>(USER_PATH + "/register", body);
		return data;
	},

	login: async (body: ILogin) => {
		const { data } = await _axiosPost<IUser>(USER_PATH + "/login", body);
		return data;
	},

	setAvatar: async (userId: string, body: IAvatar) => {
		const { data } = await _axiosPost<IAvatar>(
			USER_PATH + `/avatar?id=${userId}`,
			body
		);
		return data;
	},

	getContacts: async (userId: string) => {
		const { data } = await _axiosGet<IUser[]>(USER_PATH + "/contacts");
		return data;
	},

	test: async () => {
		return await _axiosGet(USER_PATH + `/avatar`);
	},
};

export default UserApi;
