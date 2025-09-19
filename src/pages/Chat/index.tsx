import apiDetails from "@/config/apiDetails";
import useAuthStore from "@/store/authStore";
import { Home, Menu, Settings, User } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { errorNotify } from "@/utils/MessageBar";
import { get } from "@/config/network";
import { authorizedGet } from "@/config/networkWithToken";
import ChatBox from "./ChatBox";
import ChatSideBar from "./ChatSideBar";

const Chat = () => {
  const { clearUser } = useAuthStore();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const [token, setToken] = useState("");
  const [tokenExpiry, setTokenExpiry] = useState(0);

  const getSSEToken = async () => {
    try {
      const res = await authorizedGet(`${apiDetails.endPoint.sseToken}`);
      const newToken = res?.data?.data;
      setToken(newToken);
      setTokenExpiry(Date.now() + 20 * 60 * 1000);
    } catch (err) {
      console.log(err);
      errorNotify("Something Went Wrong!");
    }
  };

  const getValidToken = async () => {
    if (!token || Date.now() >= tokenExpiry) {
      await getSSEToken();
    }
    return token;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const botMessages = [
      "Hi, good day! 👋",
      "I am Dr. Mindy, your AI Psychiatrist!.",
      "How can I help you?",
    ];

    let index = -1;

    const sendNext = () => {
      if (index >= botMessages.length - 1) {
        return;
      }
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: botMessages[index] },
        ]);
        setIsTyping(false);
        index++;
        if (index < botMessages.length) {
          setTimeout(sendNext, 500);
        }
      }, 1000);
    };
    sendNext();
    getSSEToken();
    const interval = setInterval(getSSEToken, 19 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: "welcome", label: "Home", icon: Home },
    { id: "mentor", label: "Mentors", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    navigate("/login");
    clearUser();
    localStorage.clear();
  };

  const handlePromptSend = async () => {
    const validToken = await getValidToken();
    const userMessage = { type: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsTyping(true);

    let botMessage = "";

    const eventSource = new EventSource(
      `${apiDetails.baseUrl}/ai-therapist/stream?message=${encodeURIComponent(
        prompt
      )}&token=${encodeURIComponent(validToken)}`
    );

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setMessages((prev) => [
          ...prev.filter((m) => m.type !== "_streaming_"),
          { type: "bot", content: botMessage },
        ]);
        setIsTyping(false);
        eventSource.close();
        return;
      }

      botMessage += event.data;

      setMessages((prev) => [
        ...prev.filter((m) => m.type !== "_streaming_"),
        { type: "_streaming_", content: botMessage },
      ]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      setIsTyping(false);
      eventSource.close();
    };
  };

  return (
    <div className="relative min-h-[100dvh] w-full">
      <div className="bg-secondary fixed top-0 z-20 flex w-full items-center justify-between p-3 md:hidden">
        <div className="flex items-center space-x-2 font-bold text-white">
          <Menu
            size={20}
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer"
          />
          <span>Psy AI</span>
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
