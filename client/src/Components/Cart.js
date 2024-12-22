import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import '../Styles/cart.css';
const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch services from the backend
        const response = await fetch("http://localhost:3001/getservices"); // Correct endpoint
        const data = await response.json();

        if (data.services && Array.isArray(data.services)) {
          setServices(data.services); // Update state with the fetched services
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };

    fetchServices(); // Fetch services when the component mounts
  }, []);
 

  return (
    <Container>
      <Row>
        {services && services.length > 0 ? (
          services.map((service) => (
            <Col key={service._id} md={4}>
              <div className="service-card">
                {/* Display the service image */}
                {service.imageUrl && (
                  <img
                    src={service.imageUrl}
                    alt={service.serviceName}
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                )}
                <h3>{service.serviceName}</h3>
                <p>Email: {service.email}</p>
                <p>{new Date(service.date).toLocaleDateString()}</p>
                <p>Number of women: {service.numberOfWomen}</p>
               
              </div>
            </Col>
          ))
        ) : (
          <p>No services available</p>
        )}
      </Row>
    </Container>
  );
};

export default ServiceList;
