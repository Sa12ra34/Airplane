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
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { BrowserRouter as Router, useNavigate } from "react-router-dom";
  // import User from "./User";
  import { updateUserProfile } from "../Features/userSlice";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { userValidationsSchema } from "../Validations/UserValidations";
  import Location from "./Location";
  import loc from "../Images/loc.png";
  import userr from "../Images/userr.png";
  import "../Styles/Profilestyle.css";

  const Profile = () => {
    const {  fristname, lastname, isLoading, isError } = useSelector((state) => state.users);

    const email = useSelector((state) => state.users.user.email);
    const user = useSelector((state) => state.users.user);
    const [userNamef, setUserNamef] = useState(user.fristname);
    const [userNamel, setUserNamel] = useState(user.lastname);

    const [pwd, setPwd] = useState(user.password);
    const [profilePic, setProfilePic] = useState(user.profilePic);

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const {
      register,
      handleSubmit, // Submit the form when this is called
      formState: { errors },
    } = useForm({
      resolver: yupResolver(userValidationsSchema), 
    });
  
    const handleUpdate = (event) => {
      event.preventDefault();
  
     
      const userData = {
        email: user.email, 
        fristname: userNamef,
        lastname: userNamel,
        password: pwd, 
      };
      console.log(userData);
      
      dispatch(updateUserProfile(userData));
      alert("Profile Updated.");
      // Navigate back to the profile page after the update is completed
      navigate("/");
    };
  
    // Function to handle file input change
    const handleFileChange = (event) => {
      // Use e.target.files[0] to get the file itself
      const uploadFile = event.target.files[0];
      if (!uploadFile) alert("No file uploaded");
      else setProfilePic(event.target.files[0]);
    };
  
    useEffect(() => {
      if (!user.email) {
        navigate("/login");
      }
    }, [user.email, navigate]);
  
    return (
      <Container fluid>
        
        <Row>
          <Col md={7} className="userdisplay">
            <img src={userr} alt="user" className="profileImage" />
            
            {/* <User /> */}
         
          <Col md={4}>
            <Form onSubmit={handleUpdate}>
              Upload Photo
              <br />
              <input type="file" name="profilePic" onChange={handleFileChange} />
              <FormGroup>
                <Label for="fristname">first Name</Label>
                <Input
                  id="fristname"
                  name="fristname"
                  placeholder="fristname..."
                  type="text"
                  value={userNamef}
                  {...register("firstname", {
                    onChange: (e) => {
                      setUserNamef(e.target.value);
                    },
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">last Name</Label>
                <Input
                  id="lastname"
                  name="lastname "
                  placeholder="lastname..."
                  type="text"
                  value={userNamel}
                  {...register("lastname", {
                    onChange: (e) => {
                      setUserNamel(e.target.value);
                    },
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password..."
                  type="password"
                  value={pwd}
                  {...register("password", {
                    onChange: (e) => {
                      setPwd(e.target.value);
                    },
                  })}
                />
              </FormGroup>
            
              <FormGroup>
                <Button color="primary" className="button" type="submit">
                  Update Profile
                </Button>
              </FormGroup>
            </Form>
          </Col>
         </Col>

          <Col md={4} className="locationDisplay">
            <img src={loc} alt="location" className="profileImage" />
            <h1>YOUR LOCATION</h1>
            <Location />
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Profile;
  