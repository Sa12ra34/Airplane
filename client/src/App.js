import { Container, Row } from "reactstrap";
import "./App.css";
import Home from "./Components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct import
import Login from './Components/Login';
import Register from './Components/Register';
import Service from './Components/Service';
import { useSelector } from "react-redux";
import ServiceDetail from "./Components/ServiceDetail";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
//import Location from "./Components/Location";
const App = () => {
  const email=useSelector((state)=>state.users.user.email);
  return (
    <Router> 
      <Container fluid>
        <Row>{email ? (<Header/>):null}</Row>
        {/* <Row>{<Header/>}</Row> */}
        
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/service" element={<Service />} />
            <Route path="/service/:serviceName" element={<ServiceDetail />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/profile" element={<Location />} /> */}

            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Row>
        <Row><Footer/></Row>
      </Container>
    </Router>
  );
};

export default App;
