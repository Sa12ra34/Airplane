
import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import facial from "../Images/facial.jpg";
import hairCare from "../Images/hairCare.jpg";
import makeup from "../Images/makup.jpg";
import spa from "../Images/spa.jpg";
import "../Styles/Service.css";

const Service = () => {
  const services = [
    { title: "Facial", image: facial },
    { title: "Hair Care", image: hairCare },
    { title: "Spa", image: spa },
    { title: "Makeup", image: makeup },
  ];

  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate(`/service/${service.title}`);
  };

  return (
    <Container fluid className="services">
      <Row>
        <h1 className="serviceTitle">Our Services</h1>
      </Row>
      <Row className="service-row">
        {services.map((service, index) => (
          <Col
            key={index}
            className="service-col"
            onClick={() => handleServiceClick(service)}
          >
            <div className="service-card">
              <img
                src={service.image}
                alt={`${service.title} Image`}
                className="service-image"
              />
              <div className="service-overlay">
                <h3 className="service-name">{service.title}</h3>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Service;
