import UserApi from "./userApi";
import MessageApi from "./messageApi";

const API = {
	...UserApi,
	...MessageApi,
};

export default API;
