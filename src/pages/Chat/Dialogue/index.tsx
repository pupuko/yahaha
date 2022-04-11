import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import API from "../../../api";
import { IMessage, IUser } from "../../../typings";
import { WsEmitEnum, WsOnEnum } from "../../../typings/websocket";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

const DialogueDiv = styled("div")`
	display: grid;
	grid-template-rows: 10% 78% 12%;
	gap: 0.1rem;
	padding: 1rem;
	overflow: hidden;
	@media screen and (min-width: 720px) and (max-width: 1080) {
		grid-template-rows: 15% 70% 15%;
	}

	.dialogue-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		.dialogue-user-detail {
			display: flex;
			align-items: center;
			gap: 1rem;
			.dialogue-user-avatar {
				img {
					height: 3rem;
				}
			}
			.dialogue-user-username {
				h3 {
					color: white;
				}
			}
		}
	}
`;

interface IProps {
	loginUser: IUser;
	currentChat: IUser;
	socket: Socket;
}

export default function Dialogue({ loginUser, currentChat, socket }: IProps) {
	const [messageList, setMessageList] = useState<IMessage[]>([]);

	useEffect(() => {
		if (socket) {
			socket.on(WsOnEnum.MESSAGE_RECEIVED, (message: any) => {
				setMessageList((messageList) => [
					...messageList,
					{ fromSelf: false, message },
				]);
			});
		}
	}, []);

	useEffect(() => {
		getMessageList();
	}, [currentChat]);

	async function getMessageList() {
		const res = await API.getAllMessage({
			from: loginUser._id,
			to: currentChat._id,
		});
		setMessageList(res.data);
	}

	async function sendMessage(message: string) {
		await API.sendMessage({
			from: loginUser._id,
			to: currentChat._id,
			message,
		});

		socket.emit(WsEmitEnum.SEND_MESSAGE, {
			to: currentChat._id,
			from: loginUser._id,
			message,
		});

		const _messages = [...messageList];
		_messages.push({
			fromSelf: true,
			message,
			from: loginUser._id,
			to: currentChat._id,
		});
		setMessageList(_messages);
	}

	return (
		<DialogueDiv className="dialogue-box">
			<div className="dialogue-header">
				<div className="dialogue-user-detail">
					<div className="dialogue-user-avatar">
						<img
							src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
							alt="avatar"
						/>
					</div>
					<div className="dialogue-user-username">
						<h3>{currentChat.username}</h3>
					</div>
				</div>
			</div>
			<MessageList messageList={messageList} />
			<ChatInput sendMessage={sendMessage} />
		</DialogueDiv>
	);
}
