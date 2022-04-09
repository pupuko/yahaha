import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../../api";
import { IUser } from "../../typings";
import Contacts from "./Contacts";
import Dialogue from "./Dialogue";
import Welcome from "./Welcome";
import io from "socket.io-client";

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
	const navigate = useNavigate();
	const [contacts, setContacts] = useState<IUser[]>([]);
	const [currentUser, setCurrentUser] = useState<IUser>();
	const [currentChat, setCurrentChat] = useState<IUser>();
	const socket = useRef<any>();

	useEffect(() => {
		async function checkLogin() {
			if (!localStorage.getItem("login-user")) {
				navigate("/login");
			} else {
				setCurrentUser(
					await JSON.parse(localStorage.getItem("login-user")!)
				);
			}
		}
		checkLogin();
	}, []);

	useEffect(() => {
		async function getContacts() {
			const { data } = await API.getContacts(currentUser!._id);
			setContacts(data.data);
		}

		function initSocket() {
			socket.current = io(window.CONFIG.SERVER_URL);
			socket.current.emit("add-user", currentUser?._id);
		}

		if (currentUser) {
			getContacts();
			initSocket();
		}
	}, [currentUser]);

	return (
		<ChatDiv>
			<div className="chat-box">
				<Contacts
					contacts={contacts}
					currentUser={currentUser}
					setCurrentChat={setCurrentChat}
				/>
				{currentUser &&
					(currentChat ? (
						<Dialogue
							currentUser={currentUser}
							currentChat={currentChat}
							socket={socket}
						/>
					) : (
						<Welcome currentUser={currentUser} />
					))}
			</div>
		</ChatDiv>
	);
}
