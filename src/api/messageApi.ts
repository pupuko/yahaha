import {
	ILogin,
	IRegister,
	IPromise,
	IAvatar,
	IUser,
	IMessage,
	IFindMessage,
} from "../typings";
import { _axiosGet, _axiosPost } from "./axiosHelper";
import { _post } from "./fetchHelper";

const USER_PATH = "/message";

const MessageApi = {
	sendMessage: async (body: IMessage) => {
		return await _axiosPost(USER_PATH + "/add", body);
	},

	getAllMessage: async (body: IFindMessage) => {
		return await _axiosPost<IMessage[]>(USER_PATH + "/getAll", body);
	},
};

export default MessageApi;
