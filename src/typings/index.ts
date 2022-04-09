export interface IPromise<T = any> {
	status: "success" | "fail";
	message: string;
	data: T;
}

export interface IRegister {
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
	isAvatarImageSet?: boolean;
	avatarImage?: IAvatar | string;
}

export interface ILogin {
	username: string;
	password: string;
}

export interface IUser {
	_id: string;
	username: string;
	email: string;
	password?: string;
	confirmPassword?: string;
	isAvatarImageSet?: boolean;
	avatarImage?: IAvatar | string;
}

export interface IAvatar {
	avatarImage: string | undefined;
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
