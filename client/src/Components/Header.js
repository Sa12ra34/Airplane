import { Nav, Navbar, NavItem } from "reactstrap";
import logo from '../Images/logo.png';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/userSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));

    navigate("/");
  };

  return (
    <div className="header">
    <Navbar className="navbar">
      <div className="logo">
        <img src={logo} alt="Women Beauty Salon Logo" />
      </div>
      <Nav className="nav">
        <NavItem className="nav-item">
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem className="nav-item">
          <Link to="/service">Service</Link>
        </NavItem>
        <NavItem className="nav-item">
          <Link to="/cart">Cart</Link>
        </NavItem>
        <NavItem className="nav-item">
            <Link to='/profile'>Profile</Link>
          </NavItem>
        <NavItem className="nav-item">
          <Link onClick={handlelogout}>Logout</Link>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
  );
};

export default Header;
