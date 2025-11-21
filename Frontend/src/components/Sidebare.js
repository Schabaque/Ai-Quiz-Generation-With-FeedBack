import {NavLink} from 'react-router-dom'
import {FaSchool, FaHome, FaRegSun} from 'react-icons/fa';
import logo from '../image/Logo_ai.png'
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector(state => state.auth);
  const profilePath = user?._id || localStorage.getItem('userId') || '';
  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary" id="side-barre">
            <div className="container-fluid d-flex flex-column p-0">
                <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/">
                    <div className="sidebar-brand-icon rotate-n-15"><img src={logo} alt="Logo Examen AI" width="50px" height="50px"/></div>
                    <div className="sidebar-brand-text mx-3"><span>QuiZ-AI</span></div>
                </a>
                <hr className="sidebar-divider my-0"/>
                <ul className="navbar-nav text-light mt-5" id="accordionSidebar">
                    <li className="nav-item"><NavLink className="nav-link" to="/Analytics"><span style={{"fontSize":"20px"}}><FaHome/></span>&nbsp;<span>Statistiques</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/Classes"><span style={{"fontSize":"20px"}}><FaSchool/></span>&nbsp;<span>Classes</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/Topics"><span style={{"fontSize":"20px"}}>📚</span>&nbsp;<span>Topics</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/Quizzes"><span style={{"fontSize":"20px"}}>📝</span>&nbsp;<span>Quizzes</span></NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={profilePath ? `/Profile/${profilePath}` : "/Profile"}><span style={{"fontSize":"20px"}}><FaRegSun/></span>&nbsp;<span>Settings</span></NavLink></li>
                </ul>
            </div>
        </nav>
  )
}

export default Sidebar