// import React from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import facial from "../Images/facial.jpg";
// import hairCare from "../Images/hairCare.jpg";
// import makeup from "../Images/makup.jpg";
// import spa from "../Images/spa.jpg";
// import "../Styles/ServiceDetail.css";
// import { useNavigate } from "react-router-dom";
// const services = {
//   Facial: facial,
//   "Hair Care": hairCare,
//   Spa: spa,
//   Makeup: makeup,
// };

// const ServiceDetail = () => {
//     const navigate = useNavigate();

//   const handleAdd = () => {
    
//     navigate("/cart"); 
//   };
//   const { serviceName } = useParams();
//   const serviceImage = services[serviceName] || "";

//   return (
//     <Container className="service-detail" >
//       <Row>
//       <Col md={4}>
//           <div className="service-photo">
//             <img src={serviceImage} alt={`${serviceName}`} />
//           </div>
//         </Col>
        
//         <Col md={6}>
//           <Form className="service-form">
//             <h1 className="service-title">{serviceName}</h1>
//             <FormGroup>
//               <Label for="date">Date</Label>
//               <Input type="date" name="date" id="date" />
//             </FormGroup>
//             <FormGroup>
//               <Label for="womenCount">How many women?</Label>
//               <Input type="number" name="womenCount" id="womenCount" placeholder="Enter number" />
//             </FormGroup>
//             <Button className="add-button" onClick={handleAdd}>Add</Button>
//           </Form>
//         </Col>

      
        
//       </Row>
//     </Container>
//   );
// };

// export default ServiceDetail;
import React, { useState } from "react";
import{useSelector} from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios"; // Import axios for HTTP requests
import facial from "../Images/facial.jpg";
import hairCare from "../Images/hairCare.jpg";
import makeup from "../Images/makup.jpg";
import spa from "../Images/spa.jpg";
import "../Styles/ServiceDetail.css";
// import { saveService } from "../Features/service";

const services = {
  Facial: facial,
  "Hair Care": hairCare,
  Spa: spa,
  Makeup: makeup,
};

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const email = useSelector((state) => state.users.user.email)
  // State for form input
  const [formData, setFormData] = useState({
    date: "",
    womenCount: 0,
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend
      const response = await axios.post("http://localhost:3001/saveService", {
        serviceName: serviceName,
        date: formData.date,
        numberOfWomen: formData.womenCount,
        email:email
      });

      // If the request is successful, show an alert and navigate to cart
      alert("Service added successfully!");
      console.log(response.data);
      navigate("/cart");
    } catch (error) {
      // If there’s an error, show a failure alert
      console.error("Failed to add service:", error);
      alert("Failed to add service. Please try again.");
    }
  };

  const serviceImage = services[serviceName] || "";

  return (
    <Container className="service-detail">
      <Row>
        <Col md={4}>
          <div className="service-photo">
            <img src={serviceImage} alt={serviceName} />
          </div>
        </Col>

        <Col md={6}>
          <Form className="service-form" onSubmit={handleAdd}>
            <h1 className="service-title">{serviceName}</h1>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="womenCount">How many women?</Label>
              <Input
                type="number"
                name="womenCount"
                id="womenCount"
                placeholder="Enter number"
                value={formData.womenCount}
                onChange={handleChange}
                min="1"
                required
              />
            </FormGroup>
            <Button type="submit" className="add-button">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceDetail;
