import { IMessage, IFindMessage } from "../typings";
import { _axiosGet, _axiosPost } from "./axiosHelper";
import { _post } from "./fetchHelper";

const USER_PATH = "/message";

const MessageApi = {
	sendMessage: async (body: IMessage) => {
		const { data } = await _axiosPost(USER_PATH + "/add", body);
		return data;
	},

	getAllMessage: async (body: IFindMessage) => {
		const { data } = await _axiosPost<IMessage[]>(
			USER_PATH + "/getAll",
			body
		);
		return data;
	},
};

export default MessageApi;
