import React, { useState } from "react";
import styled from "styled-components";
import { IUser } from "../../typings";
import Logo from "../../assets/logo.jpg";
import Logout from "../../components/Logout";

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
		.user {
			display: flex;
			align-items: center;
			padding: 0.4rem;
			min-height: 5rem;
			width: 90%;
			gap: 1rem;
			background-color: #ffffff39;
			border-radius: 0.2rem;
			transition: 0.2s ease-in-out;
			cursor: pointer;
			.user-avatar {
				img {
					height: 3rem;
				}
			}
			.user-username {
				h3 {
					color: white;
				}
			}

			&.selected {
				background: #9186f3;
			}
		}

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
	currentUser?: IUser;
	setCurrentChat: (u: IUser) => void;
}

export default function Contacts({
	contacts,
	currentUser,
	setCurrentChat,
}: IContacts) {
	const [selectedChat, setSelectedChat] = useState<number>();
	// function changeCurrentChat(index, contact) {}
	function changeCurrentChat(user: IUser, index: number) {
		setCurrentChat(user);
		setSelectedChat(index);
	}

	return (
		<ContactsDiv>
			<div className="brand">
				<img src={Logo} alt="logo" />
				<h3>Yahaha</h3>
			</div>

			<div className="contacts-div">
				{contacts.map((user, index) => (
					<div
						key={index}
						className={`user ${
							index === selectedChat ? "selected" : ""
						}`}
						onClick={() => changeCurrentChat(user, index)}
					>
						<div className="user-avatar">
							<img
								src={`data:image/svg+xml;base64,${user.avatarImage}`}
								alt="avatar"
							/>
						</div>
						<div className="user-username">
							<h3>{user.username}</h3>
						</div>
					</div>
				))}
			</div>

			<div className="current-user">
				<div className="user-avatar">
					<img
						src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
						alt="avatar"
					/>
				</div>
				<div className="user-username">
					<h2>{currentUser?.username}</h2>
				</div>
				<Logout />
			</div>
		</ContactsDiv>
	);
}
