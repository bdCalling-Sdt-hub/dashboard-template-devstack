import React, { useState } from "react";
import { imageUrl } from "../../redux/api/baseApi";
import { Link, useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Button, Dropdown, Menu, Modal } from "antd";
import { useUser } from "../../provider/User";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  const { user } = useUser();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const src = user?.image?.startsWith("https")
    ? user?.image
    : `${imageUrl}/${user?.image}`;

  const showLogoutConfirm = () => {
    setIsLogoutModalOpen(true); // Show the confirmation modal
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutModalOpen(false); // Close the modal
    navigate("/auth/login");
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false); // Close the confirmation modal
  };

  const menu = (
    <Menu>
      <Menu.Item key="settings">
        <Link to="/profile">Settings</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        danger
        onClick={showLogoutConfirm} 
        style={{ display: "flex", alignItems: "center" }}
      >
        
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-between gap-5 w-full px-4 rounded-md lg:px-10 shadow-md py-2">
      <h2 className="font-bold text-xl text-secondary"> Project Name</h2>
      <div className="flex items-center gap-10">
        {/* Notification Icon */}
        <Link to="/notification" className="h-fit mt-[10px]">
          <Badge count={5} backgroundColor="#3FC7EE">
            <FaRegBell color="#3FC7EE" size={32} />
          </Badge>
        </Link>

        {/* Profile Icon with Dropdown Menu */}
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              style={{
                clipPath: "circle()",
                width: 45,
                height: 45,
              }}
              src={src}
              alt="profile-pic"
              className="clip"
            />
            <div className="flex flex-col">
              <p>Md Jowel Ahmed</p>
              <p>Admin</p>
            </div>
          </div>
        </Dropdown>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        visible={isLogoutModalOpen}
        onCancel={handleCancelLogout}
        footer={[
          <Button key="cancel" onClick={handleCancelLogout}>
            Cancel
          </Button>,
          <Button key="logout" danger onClick={handleLogout}>
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default Header;
