import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/userSlice";
import "../Styles/Login.css"; // Include the CSS file for styles
import log from "../Images/login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    } else if (isSuccess) {
      navigate("/service");
    }
  }, [isError, isSuccess]);

  return (
    <Container className="login-container">
      <Row className="align-items-center">
        {/* Image Section */}
        <Col md="6" className="image-container">
          <div className="image-wrapper">
            <img src={log} alt="Login illustration" className="right-image" />
          </div>
        </Col>
        {/* Form Section */}
        <Col md="6" className="form-box">
          <Form>
            <h2 className="form-title">LOGIN</h2>
            <FormGroup>
              <Label for="email" className="form-label">
                Enter Email:
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className="form-label">
                Enter Password:
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </FormGroup>
            <Button
              
              className="form-button"
              onClick={() => handleLogin()}
            >
              LOGIN
            </Button>
            <p className="small-text">
              DON'T HAVE AN ACCOUNT?{" "}
              <Link to="/register" className="register-link">
                REGISTER
              </Link>
            </p>
          </Form>
        </Col>

        
      </Row>
    </Container>
  );
};

export default Login;
