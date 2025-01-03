"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/zustand/auth";

const Chat = () => {
	const token = useAuthStore((state) => state.jwt); const [message, setMessage] = useState<string>(""); // Input message
	const [chatMessages, setChatMessages] = useState<
		Array<{ user: string; message: string }>
	>([]); // Store message with user info
	const wsRef = React.useRef<WebSocket | null>(null);

	const createWebSocket = () => {
		const backendUrl = new URL(process.env.NEXT_PUBLIC_BACKEND || "");
		// const ws = new WebSocket(`ws://localhost:8080/ws/1?token=${token}`);
		const ws = new WebSocket(
			`${backendUrl.protocol === "http:" ? "ws" : "wss"}://${backendUrl.host}/ws/1?token=${token}`,
		);

		wsRef.current = ws;

		ws.onopen = () => {
			console.log("Connected to WebSocket");
			// Send a system message when connecting
			ws.send(JSON.stringify({ type: "system", message: "User connected" })); };

		ws.onmessage = (event) => {
			try {
				const parsedMessage = JSON.parse(event.data);
				if (parsedMessage.type === "chat") {
					// If the message is from someone else, we label it "Someone"
					const sender = parsedMessage.sender === token ? "You" : "Someone";
					setChatMessages((prevMessages) => [
						...prevMessages,
						{ user: sender, message: parsedMessage.message },
					]);
				}
				console.log(parsedMessage);
			} catch (e) {
				console.log("Error parsing WebSocket message:", e);
			}
		};

		ws.onerror = (error) => console.error("WebSocket error:", error);
		ws.onclose = (event) => {
			console.log("WebSocket connection closed", event);
			// Reconnect when WebSocket is closed unexpectedly
			if (event.code !== 1000) {
				// 1000 is normal closure
				setTimeout(() => createWebSocket(), 1000); // Reconnect after 1 second
			}
		};
	};

	useEffect(() => {
		if (!token) {
			console.log("Token is not available.");
			return;
		}
		createWebSocket();

		// Initialize WebSocket connection

		return () => {
			if (wsRef.current) {
				wsRef.current.close();
			}
		};
	}, [token]);

	const sendMessage = () => {
		if (wsRef.current && message.trim()) {
			// Send the message to the server without adding it locally
			wsRef.current.send(
				JSON.stringify({ type: "chat", message, sender: token }),
			);

			// Clear the input field
			setMessage("");
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 p-4">
			<h1 className="text-2xl font-bold">WebSocket Chat</h1>
			<div className="w-full max-w-lg border p-4 rounded-lg">
				<div className="h-64 overflow-y-auto mb-4 bg-gray-100 p-2 rounded">
					{chatMessages.map((msg, idx) => (
						<p key={idx} className="text-sm text-gray-800">
							<strong>{msg.user}:</strong> {msg.message}
						</p>
					))}
				</div>
				<div className="flex items-center gap-2">
					<input
						className="flex-1 border p-2 rounded"
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Type your message..."
					/>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						onClick={sendMessage}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
