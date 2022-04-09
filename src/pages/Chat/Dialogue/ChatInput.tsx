import React, { useState } from "react";
import styled from "styled-components";
import Picker, { IEmojiData } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInputDiv = styled("div")`
	position: relative;
	display: grid;
	grid-template-columns: 5% 95%;
	align-items: center;
	padding: 0 2rem;
	padding-bottom: 0rem;
	background-color: #080420;

	@media screen and (min-width: 720px) and (max-width: 1080) {
		padding: 0 1rem;
	}

	.button-box {
		display: flex;
		align-items: center;
		color: white;
		gap: 1rem;
		.emoji {
			position: relative;
			svg {
				font-size: 1.5rem;
				color: #ffff00c8;
				cursor: pointer;
			}
			.emoji-picker-react {
				position: absolute;
				top: -350px;
				border-color: #9186f3;
				background-color: #080420;
				box-shadow: 0 5px 10px #9a86f3;
				.emoji-scroll-wrapper::-webkit-scrollbar {
					width: 5px;
					background-color: #080420;
					&-thumb {
						background-color: #9186f3;
					}
				}
				.emoji-categories {
					button {
						filter: contrast(0);
					}
				}
				.emoji-search {
					background-color: transparent;
					border-color: #9186f3;
				}
				.emoji-group::before {
					background-color: #080420;
				}
			}
		}
	}

	.input-box {
		display: flex;
		align-items: center;
		gap: 2rem;
		width: 100%;
		border-radius: 2rem;
		background-color: #ffffff34;

		input {
			padding-left: 1rem;
			width: 90%;
			height: 60%;
			border: none;
			background-color: transparent;
			color: white;
			font-size: 1.2rem;
			&::selection {
				background-color: #9186f3;
			}
			&:focus {
				outline: none;
			}
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0.3rem 2rem;
			border: none;
			border-radius: 2rem;
			background-color: #9186f3;

			svg {
				color: white;
				font-size: 2rem;
			}

			@media screen and (min-width: 720px) and (max-width: 1080) {
				padding: 0.3rem 1rem;
				svg {
					font-size: 1rem;
				}
			}
		}
	}
`;

interface IProps {
	sendMessage: (message: string) => void;
}

export default function ChatInput({ sendMessage }: IProps) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [message, setMessage] = useState("");

	function handleEmojiClick(
		event: React.MouseEvent<Element, MouseEvent>,
		emoji: IEmojiData
	) {
		const _message = message + emoji.emoji;
		setMessage(_message);
	}

	function handleSend(event: React.FormEvent<HTMLFormElement>) {
		event?.preventDefault();
		if (message.trim().length) {
			sendMessage(message);
			setMessage("");
		}
	}

	return (
		<ChatInputDiv className="chat-input-box">
			<div className="button-box">
				<div className="emoji">
					{showEmojiPicker && (
						<Picker onEmojiClick={handleEmojiClick} />
					)}
					<BsEmojiSmileFill
						onClick={() => setShowEmojiPicker((f) => !f)}
					/>
				</div>
			</div>

			<form className="input-box" onSubmit={(e) => handleSend(e)}>
				<input
					type="text"
					placeholder="type your message here."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className="send-button">
					<IoMdSend />
				</button>
			</form>
		</ChatInputDiv>
	);
}
