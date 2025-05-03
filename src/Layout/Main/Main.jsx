import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex bg-baseBg overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-80"
        } md:w-80 h-screen bg-secondary transition-all duration-300`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="bg-[#F6F6F6] h-[calc(100vh-68px)] mt-3">
          {/* -68px */}
          <div className="h-full overflow-y-auto bg-baseBg rounded-md p-7 pt-0">
            {/* Outlet for other dynamic pages */}
            <div className="mt-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
