import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { logos } from "../../assets/img/logosjs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const NavBar = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={logos.logo2} className="w-36" alt="logo" />
      </Link>
      {/* <img src={assets.logo} className="w-36" alt="logo" /> */}

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-6 cursor-pointer"
          alt="search"
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />

          {token && (
            <div className="group relative">
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logOut}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* For sideBar smaller devices */}
        <img
          onClick={() => setVisibleMenu(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu for small device */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visibleMenu ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisibleMenu(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisibleMenu(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisibleMenu(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisibleMenu(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisibleMenu(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
