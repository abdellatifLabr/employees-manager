import React, { Fragment, useContext } from "react";
import { FaCalendarAlt, FaChevronRight, FaCog, FaUsers } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { BreadcrumbContext } from "src/contexts/BreadcrumbContext";
import { WindowsControls } from "./WindowsControls";
import logoUrl from "/assets/sonatrach-alt.svg";

const Header = () => {
  const { breadcrumb } = useContext(BreadcrumbContext);

  return (
    <div className="bg-gray-800">
      <div className="flex bg-gray-900">
        <div className="h-12 flex items-center p-2">
          <img className="h-full" src={logoUrl} alt="Workflow" />
          <div className="ml-4 text-xl font-semibold flex space-x-3 items-center">
            {breadcrumb.map((link, idx) => (
              <Fragment key={idx}>
                {idx === breadcrumb.length - 1 ? (
                  breadcrumb.length === 1 ? (
                    <span className="text-white leading-none">{link.name}</span>
                  ) : (
                    <span className="text-gray-400 leading-none">
                      {link.name}
                    </span>
                  )
                ) : (
                  <>
                    <Link
                      to={link.path ?? "#"}
                      className="text-white leading-none"
                    >
                      {link.name}
                    </Link>
                    <FaChevronRight className="-mb-0.5 text-sm text-blue-400" />
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex-1" id="header"></div>
      </div>
      <div className="fixed right-0 top-0 h-[30px] z-50" id="controls">
        <WindowsControls dark={true} />
      </div>
      <div className="p-2">
        <ul className="flex space-x-2 text-gray-300">
          <li>
            <NavLink
              activeClassName="bg-gray-900 hover:bg-gray-900 text-white"
              to="/calendar"
              className="hover:bg-gray-700 rounded px-3 py-2 font-medium cursor-pointer flex items-center space-x-3"
            >
              <FaCalendarAlt />
              <span>Calendrier</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/workers"
              activeClassName="bg-gray-900 hover:bg-gray-900 text-white"
              className="hover:bg-gray-700 rounded px-3 py-2 font-medium cursor-pointer flex items-center space-x-3"
            >
              <FaUsers />
              <span>Travailleurs</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              activeClassName="bg-gray-900 hover:bg-gray-900 text-white"
              className="hover:bg-gray-700 rounded px-3 py-2 font-medium cursor-pointer flex items-center space-x-3"
            >
              <FaCog />
              <span>Paramétres</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
