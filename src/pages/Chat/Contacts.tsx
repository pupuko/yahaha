import React, { useState } from "react";
import styled from "styled-components";
import { IUser } from "../../typings";
import Logo from "../../assets/logo.jpg";
import Logout from "../../components/Logout";
import ContactItem from "./ContactItem";

const ContactsDiv = styled("div")`
	position: relative;
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #000420;
	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		img {
			height: 2rem;
		}
		h3 {
			color: white;
			text-transform: uppercase;
		}
	}
	.contacts-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;

		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
	}
	.current-user {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		background-color: #0d0d30;
		.user-avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}
		.user-username {
			h2 {
				color: white;
			}
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			gap: 0.5rem;
			.user-username {
				font-size: 1rem;
			}
		}
	}
`;

interface IContacts {
	contacts: IUser[];
	loginUser?: IUser;
	currentChat?: IUser;
	setCurrentChat: (u: IUser) => void;
}

export default function Contacts({
	contacts,
	loginUser,
	currentChat,
	setCurrentChat,
}: IContacts) {
	return (
		<ContactsDiv>
			<div className="brand">
				<img src={Logo} alt="logo" />
				<h3>Yahaha</h3>
			</div>

			<div className="contacts-div">
				{contacts.map((user) => (
					<ContactItem
						key={user._id}
						user={user}
						currentChat={currentChat}
						setCurrentChat={setCurrentChat}
					/>
				))}
			</div>

			<div className="current-user">
				<div className="user-avatar">
					<img
						src={`data:image/svg+xml;base64,${loginUser?.avatarImage}`}
						alt="avatar"
					/>
				</div>
				<div className="user-username">
					<h2>{loginUser?.username}</h2>
				</div>
				<Logout />
			</div>
		</ContactsDiv>
	);
}
