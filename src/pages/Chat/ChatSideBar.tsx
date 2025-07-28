import { LogOut } from "lucide-react";
import React from "react";
import Images from "../../utils/Images";
import { useNavigate } from "react-router-dom";

const ChatSideBar = ({
  setSidebarOpen,
  menuItems,
  sidebarOpen,
  handleLogout,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`bg-secondary fixed z-50 min-h-[100dvh] max-w-xs shadow-lg transition-transform duration-300 md:static md:flex md:w-[20%] md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-sh-[100dvh] w-full flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 p-4 pb-5 md:flex-col lg:flex-row">
              <div
                onClick={() => navigate("/")}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
              >
                <img
                  src={Images.BOT}
                  alt="bot"
                  className="h-10 cursor-pointer rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">PsyAI</h1>
                <p className="text-xs text-indigo-100">Your AI Psychiatrist!</p>
              </div>
            </div>

            <div className="mb-3 border-t border-teal-200" />

            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`flex cursor-pointer items-center gap-2 p-3 text-[15px] font-medium text-white duration-300 hover:bg-gray-100 hover:text-gray-700`}
                >
                  <Icon size={15} />
                  {item.label}
                </div>
              );
            })}
          </div>

          <div
            className="flex cursor-pointer items-center gap-2 p-3 text-white duration-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => handleLogout()}
          >
            <LogOut size={15} />
            Logout
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ChatSideBar;
