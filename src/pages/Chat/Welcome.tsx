import React from "react";

import styled from "styled-components";
import Logo from "../../assets/logo.jpg";
import { IUser } from "../../typings";

const WelcomeDiv = styled("div")`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #fff;
	img {
		height: 20rem;
	}
	span {
		color: #4e00ff;
	}
`;

interface IProps {
	loginUser: IUser;
}

export default function Welcome({ loginUser }: IProps) {
	return (
		<WelcomeDiv>
			<img src={Logo} alt="logo" />
			<h1>
				Welcome, <span>{loginUser?.username}!</span>
			</h1>
			<h3>Please elect a chat to start messaging!</h3>
		</WelcomeDiv>
	);
}
