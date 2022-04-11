import React from "react";
import styled from "styled-components";
import { IUser } from "../../typings";

const ContactItemDiv = styled("div")`
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
`;

interface IProps {
	user: IUser;
	currentChat?: IUser;
	setCurrentChat: (u: IUser) => void;
}

export default function ContactItem({
	user,
	currentChat,
	setCurrentChat,
}: IProps) {
	return (
		<ContactItemDiv
			key={user._id}
			className={`user ${
				user._id === currentChat?._id ? "selected" : ""
			}`}
			onClick={() => setCurrentChat(user)}
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
		</ContactItemDiv>
	);
}
