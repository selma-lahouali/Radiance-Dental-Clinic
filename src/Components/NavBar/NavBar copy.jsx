import "./navBar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <div id="navBar">
        <Link to="/HomePage">
          <img id="logo" src={logo} alt="tooth logo" />
        </Link>
        <ul id="navBarList">
          <Link to="/AboutUs">
            <li>A propos</li>
          </Link>
          <Link to="/Services">
            <li>Services</li>
          </Link>
          <Link to="/Treatments">
            <li>Traitements</li>
          </Link>
          <Link to="/NewPatients">
            <li>Nouveaux patients</li>
          </Link>
        </ul>
      </div>
    </>
  );
}
