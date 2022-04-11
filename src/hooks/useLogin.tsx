import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../typings";
import io, { Socket } from "socket.io-client";

interface ILoginState {
	loginUser?: IUser;
	loginDispatch: (action: TUserAction, data?: IUser) => void;
	socket: Socket;
}

interface IProps {
	children: JSX.Element;
}

type TUserAction = "login" | "logout" | "check" | "update";

const LoginContext = createContext<ILoginState | null>(null);

export function LoginProvider({ children }: IProps) {
	const navigate = useNavigate();
	const socket = useRef<any>();
	const [loginUser, setLoginUser] = useState<IUser>();

	const loginDispatch = (action: TUserAction, data?: IUser): void => {
		switch (action) {
			case "login":
				setLoginUser(data);
				localStorage.setItem("login-user", JSON.stringify(data));
				break;

			case "logout":
				setLoginUser(undefined);
				localStorage.removeItem("login-user");
				navigate("/login");
				break;
		}
	};

	useEffect(() => {
		if (loginUser) {
			socket.current = io(window.CONFIG.SERVER_URL);
		} else {
			const _userStr = localStorage.getItem("login-user");
			if (_userStr) {
				const _user = JSON.parse(_userStr);
				setLoginUser(_user);
			}
		}
	}, [loginUser]);

	return (
		<LoginContext.Provider
			value={{ loginUser, loginDispatch, socket: socket.current }}
		>
			{children}
		</LoginContext.Provider>
	);
}

export default function useLogin() {
	const context = useContext(LoginContext);
	if (!context) {
		throw new Error(`The \`useLogin\` is not inside provider.`);
	}
	return context;
}
