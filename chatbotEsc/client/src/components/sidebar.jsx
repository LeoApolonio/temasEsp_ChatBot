import { Link } from "react-router-dom";

import {
  FaHome,
  FaRobot,
  FaFileAlt,
  FaCalendarAlt,
  FaUser
} from "react-icons/fa";

function Sidebar() {

  return (

    <div className="sidebar-ui">

      <div className="sidebar-header">

        <h1 className="sidebar-title">
          FESA
        </h1>

        <p className="text-sm text-white/70 mt-1">
          Asistente inteligente
        </p>

      </div>

      <nav className="space-y-2">

        <Link
          to="/"
          className="sidebar-link"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/chat"
          className="sidebar-link"
        >
          <FaRobot />
          Asistente
        </Link>

        <Link
          to="/tramites"
          className="sidebar-link"
        >
          <FaFileAlt />
          Trámites disponibles
        </Link>

        <Link
          to="/calendario"
          className="sidebar-link"
        >
          <FaCalendarAlt />
          Calendario
        </Link>

        <Link
          to="/perfil"
          className="sidebar-link"
        >
          <FaUser />
          Perfil
        </Link>

      </nav>

    </div>

  );

}

export default Sidebar;