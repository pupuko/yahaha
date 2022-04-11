import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../../api";
import { IUser } from "../../typings";
import Contacts from "./Contacts";
import Dialogue from "./Dialogue";
import Welcome from "./Welcome";
import io from "socket.io-client";
import { WsEmitEnum, WsOnEnum } from "../../typings/websocket";
import useLogin from "../../hooks/useLogin";

const ChatDiv = styled("div")`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	width: 100vw;
	height: 100vh;
	background-color: #131324;

	.chat-box {
		display: grid;
		grid-template-columns: 25% 75%;
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		@media screen and (min-width: 720px) and (max-width: 1080) {
			grid-template-columns: 35% 65%;
		}
	}
`;

export default function Chat() {
	const { loginUser, loginDispatch, socket } = useLogin();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState<IUser[]>([]);
	const [currentChat, setCurrentChat] = useState<IUser>();

	useEffect(() => {
		async function getContacts() {
			const res = await API.getContacts(loginUser!._id);
			setContacts(res.data.filter((user) => user._id !== loginUser!._id));
		}

		function initSocket() {
			socket.emit(WsEmitEnum.LOGIN, loginUser!._id);
			socket.on(WsOnEnum.FORCE_LOGOUT, (message: string) => {
				alert(message);
				loginDispatch("logout");
			});
		}

		if (loginUser) {
			getContacts();
			initSocket();
		} else {
			navigate("/login");
		}
	}, [loginUser]);

	return (
		<ChatDiv>
			<div className="chat-box">
				<Contacts
					contacts={contacts}
					loginUser={loginUser}
					currentChat={currentChat}
					setCurrentChat={setCurrentChat}
				/>
				{loginUser &&
					(currentChat ? (
						<Dialogue
							loginUser={loginUser}
							currentChat={currentChat}
							socket={socket}
						/>
					) : (
						<Welcome loginUser={loginUser} />
					))}
			</div>
		</ChatDiv>
	);
}
