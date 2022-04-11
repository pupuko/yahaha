export enum WsEmitEnum {
	LOGIN = "login",
	LOGOUT = "logout",
	SEND_MESSAGE = "send-message",
}

export enum WsOnEnum {
	LOGIN = "login",
	LOGOUT = "logout",
	MESSAGE_RECEIVED = "message-received",
	FORCE_LOGOUT = "force-logout",
}

export type TWsEmit = "login" | "logout" | "send-message";

export type TWsOn = "login" | "logout" | "receive-message" | "force-logout";
