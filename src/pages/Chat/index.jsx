import { Home, Menu, Settings, User } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import apiDetails from "../../config/apiDetails";
import { authorizedGet } from "../../config/networkwithtoken";

const Chat = () => {
    const { clearUser } = useAuthStore();
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const botMessages = ["Hi, good day! 👋", "I am Zara, your AI Mentor.", "How can I help you?"];

        let index = -1;

        const sendNext = () => {
            if (index >= botMessages.length - 1) {
                return;
            }
            setIsTyping(true);
            setTimeout(() => {
                setMessages((prev) => [...prev, { type: "bot", content: botMessages[index] }]);
                setIsTyping(false);
                index++;
                if (index < botMessages.length) {
                    setTimeout(sendNext, 500);
                }
            }, 1000);
        };
        sendNext();
    }, []);

    const menuItems = [
        { id: "welcome", label: "Home", icon: Home },
        { id: "mentor", label: "Talk To Mentor", icon: User },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleLogout = () => {
        navigate("/login");
        clearUser();
        localStorage.clear();
    };

    const handlePromptSend1 = async () => {
        const token = JSON.parse(localStorage.getItem("userDetails"));
        const parsedToken = token?.state?.user?.token;
        const encodedPrompt = encodeURIComponent(prompt);

        const userMessage = { type: "user", content: prompt };
        setMessages((prev) => [...prev, userMessage]);
        setPrompt("");
        setIsTyping(true);

        let botMessage = "";

        try {
            const response = await fetch(`${apiDetails.baseUrl}/ai-mentor/stream?message=${encodedPrompt}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${parsedToken}`,
                    Accept: "text/event-stream", // optional but good
                },
            });

            if (!response.ok) {
                throw new Error("SSE connection failed");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                const lines = chunk.split("\n").filter((line) => line.trim() !== "");
                for (const line of lines) {
                    if (line === "[DONE]") {
                        setMessages((prev) => [...prev.filter((m) => m.type !== "__streaming__"), { type: "bot", content: botMessage }]);
                        setIsTyping(false);
                        return;
                    }

                    botMessage += line;

                    setMessages((prev) => [...prev.filter((m) => m.type !== "__streaming__"), { type: "__streaming__", content: botMessage }]);
                }
            }
        } catch (err) {
            console.error("Fetch SSE Error:", err);
            setIsTyping(false);
        }
    };

    const handlePromptSend = () => {
        const userMessage = { type: "user", content: prompt };
        setMessages((prev) => [...prev, userMessage]);
        setPrompt("");
        setIsTyping(true);

        let botMessage = "";

        const eventSource = new EventSource(`${apiDetails.baseUrl}/ai-mentor/stream?message=${encodeURIComponent(prompt)}`);

        // const eventSource = new EventSource(`http://localhost:3000/api/chat?prompt=${encodeURIComponent(prompt)}`);

        eventSource.onmessage = (event) => {
            if (event.data === "[DONE]") {
                setMessages((prev) => [...prev.filter((m) => m.type !== "__streaming__"), { type: "bot", content: botMessage }]);
                setIsTyping(false);
                eventSource.close();
                return;
            }

            botMessage += event.data;

            setMessages((prev) => [...prev.filter((m) => m.type !== "__streaming__"), { type: "__streaming__", content: botMessage }]);
        };

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            setIsTyping(false);
            eventSource.close();
        };
    };

    return (
        <div className="font-mallanna relative min-h-[100dvh] w-full">
            <div className="bg-secondary fixed top-0 z-20 flex w-full items-center justify-between p-3 md:hidden">
                <div className="flex items-center space-x-2 font-bold text-white">
                    <Menu
                        size={20}
                        onClick={() => setSidebarOpen(true)}
                        className="cursor-pointer"
                    />
                    <span>Zara AI</span>
                </div>
            </div>

            <div className="flex">
                <ChatSideBar
                    setSidebarOpen={setSidebarOpen}
                    menuItems={menuItems}
                    sidebarOpen={sidebarOpen}
                    handleLogout={handleLogout}
                />

                <ChatBox
                    messages={messages}
                    isTyping={isTyping}
                    messagesEndRef={messagesEndRef}
                    prompt={prompt}
                    setPrompt={setPrompt}
                    handlePromptSend={handlePromptSend}
                />
            </div>
        </div>
    );
};

export default Chat;
