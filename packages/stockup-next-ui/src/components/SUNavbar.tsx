import { MenuIcon, UserIcon } from "@heroicons/react/solid";
import { ReactNode, useState } from "react";
import { NavLink, To } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import logoImage from "../images/logo.png";

function SUNavbarMenuItem(props: {
  children: ReactNode;
  to: To;
  external?: boolean;
  end?: boolean;
}) {
  const linkStyle =
    "uppercase h-full flex md:hover:text-white md:ml-4 font-semibold text-sm pt-5 pb-5 ";

  const content = <div className="m-auto flex">{props.children}</div>;

  return props.external ? (
    <a href={`${props.to}`} className={`${linkStyle} text-[#708090]`}>
      {content}
    </a>
  ) : (
    <NavLink
      to={props.to}
      end={props.end}
      className={(p) => linkStyle + (p.isActive ? "md:text-white" : "text-[#708090]")}
    >
      {content}
    </NavLink>
  );
}

export default function SUNavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const auth = useAuth();

  return (
    <header className="w-full bg-stockup">
      <div className="flex h-[80px] justify-between md:justify-around w-full m-auto">
        <button
          className="text-white p-6 md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MenuIcon className="w-7 h-7" />
        </button>

        <a href="/" className="flex h-full mr-6">
          <img
            alt="Stockup"
            src={logoImage}
            className="w-[120px] h-[60px] m-auto"
           />
        </a>

        <div
          className={
            `absolute drop-shadow md:drop-shadow-none transition-all md:static top-[80px] md:top-0 bg-white md:bg-inherit w-full md:w-auto z-10 md:flex md:visible ${
            showMenu ? "left-0" : "left-[-100vw]"}`
          }
        >
          <SUNavbarMenuItem end to="/">
            Home
          </SUNavbarMenuItem>
          <SUNavbarMenuItem to="/inventory">Inventory</SUNavbarMenuItem>
          <SUNavbarMenuItem to="/how-it-works">How it works</SUNavbarMenuItem>
          <SUNavbarMenuItem to="/contact">Contact</SUNavbarMenuItem>
          {auth ? (
            <SUNavbarMenuItem to="/profile">
                <UserIcon className="w-4 h-4 m-auto mr-1" />
                My Profile
            </SUNavbarMenuItem>
          ) : (
            <>
              <SUNavbarMenuItem to="/auth/signin">Sign In</SUNavbarMenuItem>
              <SUNavbarMenuItem to="/auth/signup">Sign Up</SUNavbarMenuItem>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
