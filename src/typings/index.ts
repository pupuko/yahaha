import * as User from "./user";

export interface IPromise<T = any> {
	status: "success" | "fail";
	message: string;
	data: T;
}

export interface IUser {
	_id: string;
	username: string;
	password?: string;
	isAvatarImageSet?: boolean;
	avatarImage?: string;
}

export interface IRegister {
	username: string;
	password: string;
	confirmPassword?: string;
	isAvatarImageSet?: boolean;
	avatarImage?: string;
}

export interface ILogin {
	username: string;
	password: string;
}

export interface IAvatar {
	avatarImage: string;
}

export interface IMessage {
	message: string;
	from?: string;
	to?: string;
	fromSelf?: boolean;
}

export interface IFindMessage {
	from: string;
	to: string;
}
