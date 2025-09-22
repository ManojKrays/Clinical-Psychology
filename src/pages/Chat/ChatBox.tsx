import { SendHorizontal } from "lucide-react";
import React, {  useState } from "react";
import Images from "../../utils/Images";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { authorizedPost } from "@/config/networkWithToken";
import apiDetails from "@/config/apiDetails";

const ChatBox = ({
  messages,
  isTyping,
  messagesEndRef,
  prompt,
  setPrompt,
  handlePromptSend,
}) => {
  const navigate = useNavigate();

  const nonStreamingMessages = messages.filter(
    (msg) => msg.type !== "__streaming__"
  );
  const streamingMessage = messages.find((msg) => msg.type === "__streaming__");
  const [paymentLoading, setPaymentLoading] = useState(false);
   const userDetails = useAuthStore((state) => state.user);
  const clientId = userDetails?.id;


  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const data = {
        clientId: userDetails?.id,
        amount: 500,
        currency: "INR",
        productName: "AI Chat Package",
        quantity: 1,
      };
      console.log("Booking Details", data);

      const res = await authorizedPost(apiDetails.endPoint.chat_checkout, data);
      console.log(res);
      if (res.status) {
       window.location.href = res?.data?.data?.sessionUrl;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="scrollable h-[100dvh] flex-1 overflow-y-auto bg-gray-100 pt-10 lg:px-20">
      <div className="relative flex h-full flex-col space-y-4 overflow-y-auto pt-5 md:pt-0">
        <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
          {nonStreamingMessages.map((msg, idx) => {
            const isBot = msg.type === "bot";
            const isLimit = msg.type === "limit";

            return (
              <div
                key={idx}
                className={`flex max-w-[80%] items-end space-x-2 ${
                  msg.type === "user"
                    ? "ml-auto flex-row-reverse space-x-reverse"
                    : "mr-auto"
                }`}
              >
                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  {isBot || isLimit ? (
                    <img src={Images.BOT} alt="bot icon" className="h-8 w-8" />
                  ) : msg.type === "user" ? (
                    <img
                      src={Images.USER}
                      alt="user icon"
                      className="h-8 w-8"
                    />
                  ) : null}
                </div>

                <div
                  className={`rounded-xl px-4 py-2 text-[14px] break-words whitespace-pre-wrap shadow-sm ${
                    msg.type === "user"
                      ? "rounded-br-none bg-sky-200 text-gray-800"
                      : "rounded-bl-none bg-white text-gray-800"
                  }`}
                >
                  {isLimit ? (
                    <div className="flex flex-col items-start space-y-2">
                      <p>{msg.content}</p>
                      
                      <Button
                        variant="cta"
                        size="sm"
                        className="w-full"
                          disabled={paymentLoading}
                         onClick= {handlePayment}
                      >
                        Upgrade the Plan Now
                      </Button>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            );
          })}

          {/* streaming message + typing indicator same as before */}
          {streamingMessage && (
            <div className="mr-auto flex max-w-[80%] items-end space-x-2">
              <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                <img src={Images.BOT} alt="bot icon" className="h-8 w-8" />
              </div>

              <div className="rounded-xl rounded-bl-none bg-white px-4 py-2 text-[14px] text-gray-800 shadow-sm">
                {streamingMessage.content}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />

          {isTyping && !streamingMessage && (
            <div className="mt-2 flex items-center gap-3 pb-5">
              <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                <img src={Images.BOT} alt="bot icon" className="h-8 w-8" />
              </div>
              <div className="inline-flex items-center space-x-2 rounded-tl-lg rounded-r-lg bg-white px-4 py-2 text-[14px] text-gray-500 shadow">
                <span>Typing</span>
                <span className="flex items-center space-x-1">
                  <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                  <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="block h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input area stays unchanged */}
        <div className="relative p-3">
          <textarea
            name="prompt"
            placeholder="Ask Anything..."
            className="w-full resize-none rounded-md border border-gray-300 p-2 pr-10 text-sm outline-none focus:border-green-500"
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="button"
            disabled={!prompt.trim()}
            className="absolute top-1/2 right-5 flex -translate-y-1/2 cursor-pointer items-center justify-center"
            onClick={handlePromptSend}
          >
            <SendHorizontal
              size={20}
              className={`text-gray-500 ${
                prompt.trim() ? "hover:text-gray-600" : "opacity-50"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
