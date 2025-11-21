import {NavLink} from 'react-router-dom';

const NavigationStduentClasses = () => {
  return (
    <nav className="d-flex flex-row justify-content-center align-items-center mt-2 mb-2">
      <NavLink to={`/Classes/${localStorage.getItem("idClasse")}/Students`} style={{"marginRight":"10px"}}> Students </NavLink>
      <NavLink to={`/Classes/${localStorage.getItem("idClasse")}/Examens`} style={{"marginLeft":"10px"}}> Exams </NavLink>
    </nav>
  );
}

export default NavigationStduentClasses