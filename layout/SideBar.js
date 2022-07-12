import SidebarAdmin from "./SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";
import SidebarCustomer from "./SidebarCustomer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showModules, setShowModules] = useState(false);
  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
    if (showSidebar === false) {
      setShowModules(false);
    }
  };
  const style = "w-full h-full bg-gray-500 rounded-lg";
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div
      className={`w-64 fixed  h-screen z-50 bg-black text-white float-left clear-right  transition duration-300 ease-in-out  ${
        showSidebar ? "-translate-x-52" : "translate-x-0"
      }`}
    >
      <div className="p-4 flex justify-between border-b-2 border-b-primary">
        <Icon name="fa-school" size="xl" />
        <button onClick={handleSidebar}>
          {showSidebar ? (
            <Icon name="fa-bars" size="xl" />
          ) : (
            <Icon name="fa-xmark" size="xl" />
          )}
        </button>
      </div>
      <aside className="" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 rounded">
          {user.admin ? (
            <SidebarAdmin
              style={style}
              setShowModules={setShowModules}
              showModules={showModules}
            />
          ) : (
            <SidebarCustomer
              style={style}
              setShowModules={setShowModules}
              showModules={showModules}
            />
          )}
        </div>
      </aside>
      {/* </div> */}
    </div>
  );
};

export default Sidebar;
