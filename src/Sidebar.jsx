import { NavLink,useLocation } from 'react-router-dom'

function Sidebar({ isOpen }) {
  const location = useLocation()

  const isStudentActive =
    location.pathname.startsWith('/studentList') ||
    location.pathname.startsWith('/studentForm')
  return (
    <div className={`sidebar bg-light ${isOpen ? 'open' : 'closed'}`}>
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <i class="fa-solid fa-chart-line pe-4"></i>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/studentList"
            className={`nav-link ${isStudentActive ? 'active' : ''}`}
          >
            <i className="fa-solid fa-list pe-4"></i>
            Student List
          </NavLink>
        </li>


        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <i class="fa-solid fa-gear pe-4 "></i>
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
