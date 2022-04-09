import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import styled from "styled-components";
import API from "../../api";
import Logo from "../../assets/logo.jpg";
import { IRegister } from "../../typings";
import { toastOptions } from "../../utils/common";

const RegisterDiv = styled("div")`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	width: 100vw;
	height: 100vh;
	background-color: #131324;
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 3rem 5rem;
		background-color: #00000076;
		border-radius: 1rem;

		input {
			padding: 1rem;
			width: 100%;
			color: white;
			background-color: transparent;
			border: 0.1rem solid #4e0eff;
			border-radius: 0.4rem;
			outline: none;
			font-size: 1rem;
			transition: 0.2s;
			&:focus {
				border: 0.1rem solid #997af0;
				outline: none;
			}
		}

		button {
			padding: 1rem 2rem;
			border: none;
			border-radius: 0.4rem;
			background-color: #997af0;
			color: white;
			font-weight: bold;
			font-size: 1rem;
			text-transform: uppercase;
			transition: 0.2s;
			cursor: pointer;
			&:hover {
				background-color: #4e0eff;
			}
		}

		span {
			color: white;
			text-transform: uppercase;
			a {
				color: #4e0eff;
				text-decoration: none;
				font-weight: bold;
			}
		}
	}

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;

		img {
			width: 100px;
			height: 100px;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}
`;

export default function Register() {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("login-user")) {
			navigate("/");
		}
	}, []);

	const [registerForm, setRegisterForm] = useState<IRegister>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		if (!handleValidation()) return;

		const { username, email, password } = registerForm;
		const { data } = await API.register({ username, email, password });

		if (data.status === "success") {
			localStorage.setItem("login-user", JSON.stringify(data.data));
			navigate("/avatar");
		} else {
			toast.error(data.message, toastOptions);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
	};

	function handleValidation() {
		const { username, email, password, confirmPassword } = registerForm;
		if (password !== confirmPassword) {
			toast.error(
				"The confirm password should same as the password.",
				toastOptions
			);
			return false;
		} else if (username.length < 3) {
			toast.error(
				"Username shoule be greater than 3 characters.",
				toastOptions
			);
		}

		return true;
	}

	return (
		<>
			<RegisterDiv>
				<form onSubmit={handleSubmit}>
					<div className="brand">
						<img src={Logo} alt="logo" />
						<h1>YAHAHA</h1>
					</div>
					<input
						type="text"
						name="username"
						placeholder="UserName"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						onChange={handleChange}
					/>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						onChange={handleChange}
					/>
					<button type="submit">Create!</button>
					<span>
						Already have an account?
						<Link to="/login"> Login</Link>
					</span>
				</form>
			</RegisterDiv>
			<ToastContainer />
		</>
	);
}
