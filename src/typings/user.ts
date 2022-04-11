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
