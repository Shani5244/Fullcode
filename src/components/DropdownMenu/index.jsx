import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import '../../components/DropdownMenu/Style.css';


const DropdownMenu = ({ onLogout }) => {
    return (
        <div className="dropdown-menu custom-dropdown">
            <Link to="/home" className="dropdown-item">
                <FontAwesomeIcon icon={faHouse} className="me-2" /> Home
            </Link>
            <Link to="/profile" className="dropdown-item">
                <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
            </Link>
            <button onClick={onLogout} className="dropdown-item logout-btn">
                <FontAwesomeIcon icon={faRightFromBracket} className="me-2" /> Logout
            </button>
        </div>
    );
};

export default DropdownMenu;
