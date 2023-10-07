import { OfficeBuildingIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

interface ISUSidebarProps {
  open: boolean;
}

const navClassName =
  "flex items-center p-3 font-bold rounded-l w-full h-full transition-colors hover:bg-grey-200 ";
const activeClassName = "!bg-stockup-pink text-white ";

export default function SUSidebar({ open }: ISUSidebarProps) {
  const navContainer = [
    {
      title: "Dealerships",
      icon: OfficeBuildingIcon,
      url: "dealerships",
    },
  ];

  return (
    <>
      {open && (
        <div style={{ height: "calc(100vh - 80px" }} className="flex">
          <div className="flex flex-col h-full bg-white shadow-xl min-w-[250px]">
            <div className="space-y-3">
              <div className="flex-1">
                <nav>
                  <ul>
                    {navContainer.map((el, index) => {
                        return (
                          <li key={index} className="pl-2 pt-2">
                            <NavLink
                              className={({ isActive }) => navClassName + (isActive ? activeClassName : "")}
                              to={`/admin/${el.url}`}
                            >
                              <el.icon className="w-4 h-4 mr-2" />
                              {el.title}
                            </NavLink>
                          </li>
                        );
                      })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
