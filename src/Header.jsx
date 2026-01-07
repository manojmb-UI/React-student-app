import { useNavigate } from "react-router-dom";
function Header({ toggleSidebar }) {

    const navigate = useNavigate();

    const user = localStorage.getItem('user');
    const firstname = JSON.parse(user)?.firstName;
    const lastname = JSON.parse(user)?.lastName;

    function logout() {
        localStorage.removeItem('user');
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top px-3 d-flex justify-content-between">

            <div className="d-flex align-items-center">
                <button
                    className="btn btn-outline-light me-3"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
                <span className="navbar-brand mb-0 h1">EduTrack</span>
            </div>

            <div className="dropdown">
                <button
                    className="btn p-0 border-0 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src={`https://ui-avatars.com/api/?name=${firstname}&background=0D8ABC&color=fff`}
                        alt="profile"
                        className="rounded-circle"
                        width="30"
                        height="30"
                    />
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li className="dropdown-item-text profile_name">
                        {`${firstname} ${lastname}`}
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button className="dropdown-item text-danger" onClick={logout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

        </nav>
    );
}

export default Header;

