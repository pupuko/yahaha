import { ILogin, IRegister, IPromise, IAvatar, IUser } from "../typings";
import { _axiosGet, _axiosPost } from "./axiosHelper";
import { _post } from "./fetchHelper";

const USER_PATH = "/user";

const UserApi = {
	register: async (body: IRegister) => {
		return await _axiosPost<IRegister>(USER_PATH + "/register", body);
	},

	login: async (body: ILogin) => {
		return await _axiosPost<ILogin>(USER_PATH + "/login", body);
	},

	setAvatar: async (userId: string, body: IAvatar) => {
		return await _axiosPost<IAvatar>(
			USER_PATH + `/avatar?id=${userId}`,
			body
		);
	},

	getContacts: async (userId: string) => {
		return await _axiosGet<IUser[]>(USER_PATH + "/contacts");
	},

	test: async () => {
		return await _axiosGet(USER_PATH + `/avatar`);
	},
};

export default UserApi;
