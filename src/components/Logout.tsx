import React from "react";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();
	function handleClick() {
		localStorage.clear();
		navigate("/login");
	}
	return (
		<LogoutDiv>
			<BiPowerOff onClick={handleClick} />
		</LogoutDiv>
	);
}
