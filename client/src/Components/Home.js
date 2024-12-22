
// import React from "react";
// import "../Styles/home.css";
// import home from '../Images/home.png';

// const HomePage = () => {
//   return (
//     <div className="homepage">
//       <div className="hero-section">
//         <div className="text-content">
//           <h1>Discover Your <br /> Beauty</h1>
//           <button className="start-button">START NOW</button>
//         </div>
//         <div className="image-content">
//           <img
//             src={home} // Replace with your image URL
//             alt="Beauty Salon"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Styles/home.css";
import { useEffect } from "react";
import home from '../Images/home.png';

const HomePage = () => {
  const email=useSelector((state)=>state.users.user.email);
   useEffect(()=>{
     if(!email){
       navigate("/login");
     }
   }, [email]);
 
  const navigate = useNavigate(); // Hook for navigation

  const handleStartNow = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="text-content">
          <h1>Discover Your <br /> Beauty</h1>
          <button className="start-button" onClick={handleStartNow}>
            START NOW
          </button>
        </div>
        <div className="image-content">
          <img
            src={home} // Replace with your image URL
            alt="Beauty Salon"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
