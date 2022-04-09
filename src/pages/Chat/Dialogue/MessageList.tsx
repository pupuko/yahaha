import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { IMessage } from "../../../typings";

const MessageListDiv = styled("div")`
	position: relative;
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 0.2rem;
		&-thumb {
			background-color: #ffffff39;
			width: 0.1rem;
			border-radius: 1rem;
		}
	}

	.message {
		display: flex;
		align-items: center;
		.content {
			padding: 1rem;
			max-width: 40%;
			border-radius: 1rem;
			font-size: 1.1rem;
			color: #d1d1d1;
			overflow-wrap: break-word;
		}

		&.send {
			justify-content: flex-end;
			.content {
				background-color: #4f04ff21;
			}
		}

		&.recieve {
			justify-content: flex-start;
			.content {
				background-color: #9900ff20;
			}
		}
	}
`;

interface IProps {
	messageList?: IMessage[];
}

export default function MessageList({ messageList }: IProps) {
	const scrollRef = useRef<any>();

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
	}, [messageList]);

	return (
		<MessageListDiv>
			{messageList?.map((message, index) => (
				<div key={index} className="message-item" ref={scrollRef}>
					<div
						className={`message ${
							message.fromSelf ? "send" : "recieve"
						}`}
					>
						<div className="content">
							<p>{message.message}</p>
						</div>
					</div>
				</div>
			))}
		</MessageListDiv>
	);
}
