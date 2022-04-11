import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "../../api";
import { Buffer } from "buffer";
import Loader from "../../assets/loader.gif";
import { IUser, IAvatar } from "../../typings";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../utils/common";

const AvatarPickerDiv = styled("div")`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 3rem;
	width: 100vw;
	height: 100vh;
	background-color: #131324;

	.title-box {
		h1 {
			color: white;
		}
	}
	.avatar-box {
		display: flex;
		gap: 2rem;

		.avatar {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.4rem;
			border: 0.4rem solid transparent;
			border-radius: 5rem;
			transition: 0.2s ease-in-out;
			img {
				height: 6rem;
			}
			&.selected {
				border-color: #4e0eff;
			}
		}
	}

	.submit-button {
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
`;

export default function AvatarPicker() {
	// const randomAvatarUrl = "/api/avatar";
	const randomAvatarUrl = "https://api.multiavatar.com";
	const navigate = useNavigate();
	const [avatarGallery, setAvatarGallery] = useState<string[]>();
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState<number>(0);

	useEffect(() => {
		async function getRandomAvatar() {
			const data: string[] = [];
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(
					`${randomAvatarUrl}/${Math.round(Math.random() * 1000)}`
				);
				const buffer = Buffer.from(image.data);
				data.push(buffer.toString("base64"));
			}
			setAvatarGallery(data);
			setIsLoading(false);
		}
		getRandomAvatar();
	}, []);

	async function setProfileAvatar() {
		const user: IUser = await JSON.parse(
			localStorage.getItem("login-user")!
		);
		await API.test();
		const res = await API.setAvatar(user._id, {
			avatarImage: avatarGallery![selectedAvatar],
		});

		if (res.status === "success") {
			user.isAvatarImageSet = true;
			user.avatarImage = res.data.avatarImage;
			localStorage.setItem("login-user", JSON.stringify(user));
			navigate("/");
		} else {
			toast.error("error", toastOptions);
		}
	}

	return (
		<>
			<AvatarPickerDiv>
				{isLoading ? (
					<img src={Loader} alt="loading" />
				) : (
					<>
						<div className="title-box">
							<h1>Pick an avatar as your profile picture!</h1>
						</div>
						<div className="avatar-box">
							{avatarGallery?.map((avatar, index) => (
								<div
									key={index}
									className={`avatar ${
										selectedAvatar === index
											? "selected"
											: ""
									}`}
								>
									<img
										src={`data:image/svg+xml;base64,${avatar}`}
										alt="avatar"
										onClick={() => setSelectedAvatar(index)}
									/>
								</div>
							))}
						</div>
						<button
							className="submit-button"
							onClick={setProfileAvatar}
						>
							Set as Profile Picture
						</button>
					</>
				)}
			</AvatarPickerDiv>
			<ToastContainer />
		</>
	);
}
