import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { IUser } from "../typings";
import { WsEmitEnum } from "../typings/websocket";
import useLogin from "../hooks/useLogin";

const LogoutDiv = styled("div")`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: #9186f3;
	border: none;
	cursor: pointer;

	svg {
		font-size: 1.3rem;
		color: #ebe7ff;
	}
`;

export default function Logout() {
	const { loginUser, loginDispatch, socket } = useLogin();

	function logoutClick() {
		loginDispatch("logout");
		socket.emit(WsEmitEnum.LOGOUT, loginUser?._id);
	}

	return (
		<LogoutDiv>
			<BiPowerOff onClick={logoutClick} />
		</LogoutDiv>
	);
}
