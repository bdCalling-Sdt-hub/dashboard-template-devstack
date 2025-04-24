import { Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import {
  Dashboard,
  SalesRepsManagement,
  Settings,
  RetailersManagement,
  InventoryManagement,
  LoyaltyProgram,
  SubscriptionManagement,
  OrderManagement,
} from "../../components/common/Svg"; // Import the relevant SVGs
import image4 from "../../assets/image4.png"; // Logo image

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const showLogoutConfirm = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutModalOpen(false);
    navigate("/auth/login");
  };

  const handleCancel = () => {
    setIsLogoutModalOpen(false);
  };

  // Function to check if a menu item is active
  const isItemActive = (itemKey) => {
    return (
      selectedKey === itemKey ||
      (itemKey === "subMenuSetting" &&
        ["/profile", "/terms-and-conditions", "/privacy-policy"].includes(
          selectedKey
        ))
    );
  };

  // Render icon with conditional color based on active route
  const renderIcon = (IconComponent, itemKey) => {
    const isActive = isItemActive(itemKey);
    return (
      <div
        style={{ width: 20, height: 20 }}
        className={isActive ? "svg-active" : ""}
      >
        <IconComponent
          className="menu-icon"
          fill={isActive ? "#ffffff" : "#1E1E1E"} // Active icon color set to white
        />
      </div>
    );
  };

  const menuItems = [
    {
      key: "/",
      icon: renderIcon(Dashboard, "/"),
      label: <Link to="/">Dashboard Overview</Link>,
    },
    {
      key: "/salesRepsManage",
      icon: renderIcon(SalesRepsManagement, "/salesRepsManage"),
      label: <Link to="/salesRepsManage">Sales Reps Management</Link>,
    },
    {
      key: "/retailer",
      icon: renderIcon(RetailersManagement, "/retailer"),
      label: <Link to="/retailer">Retailer Management</Link>,
    },
    {
      key: "/orderManagement",
      icon: renderIcon(OrderManagement, "/orderManagement"),
      label: <Link to="/orderManagement">Orders Management</Link>,
    },
    {
      key: "/category",
      icon: renderIcon(SubscriptionManagement, "/category"),
      label: <Link to="/category">Category Management</Link>,
    },
    {
      key: "/products",
      icon: renderIcon(SubscriptionManagement, "/products"),
      label: <Link to="/products">Products Management</Link>,
    },
    {
      key: "/color",
      icon: renderIcon(SubscriptionManagement, "/color"),
      label: <Link to="/color">Color Management</Link>,
    },
    // {
    //   key: "/inventory",
    //   icon: renderIcon(InventoryManagement, "/inventory"),
    //   label: <Link to="/inventory">Inventory Management</Link>,
    // },
    {
      key: "/subscription",
      icon: renderIcon(InventoryManagement, "/subscription"),
      label: <Link to="/subscription">Subscription Package</Link>,
    },
    // {
    //   key: "/loyaltyProgram",
    //   icon: renderIcon(LoyaltyProgram, "/loyaltyProgram"),
    //   label: <Link to="/loyaltyProgram">Loyalty Program</Link>,
    // },
    {
      key: "/subsciption",
      icon: renderIcon(SubscriptionManagement, "/subsciption"),
      label: <Link to="/subsciption">Subscription Management</Link>,
    },

    // {
    //   key: "category",
    //   icon: renderIcon(SubscriptionManagement, "category"),
    //   label: "Category Managemnet",
    //   children: [
    //     {
    //       key: "/category",
    //       label: <Link to="/category">Category</Link>,
    //     },
    //   ],
    // },

    {
      key: "/user",
      icon: renderIcon(SubscriptionManagement, "/user"),
      label: <Link to="/user">User Management</Link>,
    },
    {
      key: "subMenuSetting",
      icon: renderIcon(Settings, "subMenuSetting"),
      label: "Settings",
      children: [
        {
          key: "/profile",
          label: <Link to="/profile">Update Profile</Link>,
        },
        {
          key: "/faq",
          label: <Link to="/faq">FAQ </Link>,
        },
        {
          key: "/contact",
          label: <Link to="/contact">Contact Us</Link>,
        },
        // {
        //   key: "/about",
        //   label: <Link to="/about">About Us </Link>,
        // },
        {
          key: "/terms-and-conditions",
          label: <Link to="/terms-and-conditions">Terms And Condition</Link>,
        },
        {
          key: "/privacy-policy",
          label: <Link to="/privacy-policy">Privacy Policy</Link>,
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={showLogoutConfirm}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="sidebar-container">
      <Link
        to={"/"}
        className="logo-container flex items-center justify-center py-4 "
      >
        <img src={image4} alt="logo" className="w-40 h-32" />
      </Link>

      {/* Scrollable menu section */}
      <div className="menu-container">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          className="font-poppins text-black sidebar-menu py-10"
          style={{
            // borderRightColor: "transparent",
            background: "#fff",
            padding:"30px 5px"
          }}
          items={menuItems.map((item) => ({
            ...item,
            label: <span>{item.label}</span>,
            children: item.children
              ? item.children.map((subItem) => ({
                  ...subItem,
                  label: <span>{subItem.label}</span>,
                }))
              : undefined,
          }))}
        />
      </div>

      <Modal
        centered
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
};

export default Sidebar;
