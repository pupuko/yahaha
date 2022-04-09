import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../../../api";
import { IMessage, IUser } from "../../../typings";
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
	currentUser: IUser;
	currentChat: IUser;
	socket: any;
}

export default function Dialogue({ currentUser, currentChat, socket }: IProps) {
	const [messageList, setMessageList] = useState<IMessage[]>([]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on("message-receive", (message: any) => {
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
		const { data } = await API.getAllMessage({
			from: currentUser._id,
			to: currentChat._id,
		});
		setMessageList(data.data);
	}

	async function sendMessage(message: string) {
		const { data } = await API.sendMessage({
			from: currentUser._id,
			to: currentChat._id,
			message,
		});

		socket.current.emit("send-message", {
			to: currentChat._id,
			from: currentUser._id,
			message,
		});

		const _messages = [...messageList];
		_messages.push({
			fromSelf: true,
			message,
			from: currentUser._id,
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
