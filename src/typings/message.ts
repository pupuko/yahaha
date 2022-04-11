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
