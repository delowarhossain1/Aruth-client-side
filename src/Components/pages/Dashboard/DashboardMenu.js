import React from "react";
import { Link } from 'react-router-dom';

const DashboardMenu = ({value = {}}) => {
    const {link = '/dashboard', icon="fa-solid fa-chart-line", text = "Dashboard"} = value;

  return (
    <li className="dashboard-main-menu">
      <Link to={link} className="block">
        <i className={`${icon} mr-2`}></i>
        {text}
      </Link>
    </li>
  );
};

export default DashboardMenu;
