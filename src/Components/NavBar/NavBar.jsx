import "./navBar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <div id="navBar">
        {/* logo */}
        <Link to="/HomePage">
          <img id="logo" src={logo} alt="tooth logo" />
        </Link>
        {/* navlinks */}
        <ul id="navBarList">
          <li>
            <Link to="/AboutUs"> A propos </Link>
          </li>
          <li>
            <Link to="/Services"> Services </Link>
            <ul>
              <li>Général</li>
              <li>Cosmetique</li>
              <li>Sourir</li>
            </ul>
          </li>
          <li>
            <Link to="/Treatments"> Traitements </Link>
            <ul>
              <li>Douleur</li>
              <li>Carries</li>
              <li>Dentes manquantes</li>
              <li>Dente cassé ou fracturé</li>
              <li>Dente mobile</li>
              <li>Sensibilité dentaire</li>
              <li>Saigenent de la gensive</li>
              <li>Dentes sensibles</li>
              <li>Dents tordues</li>
            </ul>
          </li>
          <li>
            <Link to="/NewPatients"> Nouveaux patients </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
