// import { Button, Form, FormGroup, Input } from "reactstrap";
// import { userValidationsSchema } from "../Validations/UserValidations";
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
// import { register } from "../Features/userSlice";
// import { useNavigate } from "react-router-dom";
// import '../Styles/Register.css';

// const Register = () => {
//   const userList = useSelector((state) => state.users.value);
//   const [fristname, setfristname] = useState("");
//   const [lastname, setlastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmPassword] = useState("");

//   const {
//     register,
//     handleSubmit: submitForm,
//     trigger,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(userValidationsSchema),
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (data) => {
//     try {
//       console.log("Validation all good", data);

//       const userData = {
//         fristname: data.fristname,
//         lastname: data.lastname,
//         email: data.email,
//         password: data.password,
//       };

//       dispatch(register(userData));
//       navigate("/login"); // After registering, go to login
//       console.log("Form Data", userData);
//     } catch (error) {
//       console.log("Error", error);
//     }
//   };

//   return (
//     <div className="register-container">
//       <Form className="register-form" onSubmit={submitForm(handleSubmit)}>
//         <h2 className="form-title">Register</h2>
//         <div className="form-group">
//           <FormGroup>
//             <label htmlFor="fristname" className="form-label">
//               First Name:
//             </label>
//             <Input
//               id="fristname"
//               type="text"
//               className="form-control"
//               name="fristname"
//               placeholder="First Name"
//               {...register("fristname")}
//               onChange={(e) => {
//                 setValue("fristname", e.target.value);
//                 trigger("fristname");
//               }}
//             />
//             <p className="error">{errors.fristname?.message}</p>
//           </FormGroup>
//         </div>

//         <div className="form-group">
//           <label htmlFor="lastname" className="form-label">
//             Last Name:
//           </label>
//           <Input
//             id="lastname"
//             type="text"
//             className="form-control"
//             name="lastname"
//             placeholder="Last Name"
//             {...register("lastname")}
//             onChange={(e) => {
//               setValue("lastname", e.target.value);
//               trigger("lastname");
//             }}
//           />
//           <p className="error">{errors.lastname?.message}</p>
//         </div>

//         <div className="form-group">
//           <label htmlFor="email" className="form-label">
//             Email:
//           </label>
//           <Input
//             id="email"
//             type="email"
//             className="form-control"
//             name="email"
//             placeholder="Email"
//             {...register("email")}
//             onChange={(e) => {
//               setValue("email", e.target.value);
//               trigger("email");
//             }}
//           />
//           <p className="error">{errors.email?.message}</p>
//         </div>

//         <div className="form-group">
//           <label htmlFor="password" className="form-label">
//             Password:
//           </label>
//           <Input
//             id="password"
//             type="password"
//             className="form-control"
//             name="password"
//             placeholder="Password"
//             {...register("password")}
//             onChange={(e) => {
//               setValue("password", e.target.value);
//               trigger("password");
//             }}
//           />
//           <p className="error">{errors.password?.message}</p>
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmpassword" className="form-label">
//             Confirm Password:
//           </label>
//           <Input
//             id="confirmpassword"
//             type="password"
//             className="form-control"
//             name="confirmpassword"
//             placeholder="Confirm Password"
//             {...register("confirmpassword")}
//             onChange={(e) => {
//               setValue("confirmpassword", e.target.value);
//               trigger("confirmpassword");
//             }}
//           />
//           <p className="error">{errors.confirmpassword?.message}</p>
//         </div>

//         <div>
//           <Button className="register-button" color="primary" type="submit">
//             Register
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default Register;

import { Button, Form, FormGroup, Input } from "reactstrap";
import { userValidationsSchema } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { register as registerAction } from "../Features/userSlice"; // Rename Redux action to avoid conflict
import "../Styles/Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register, // React Hook Form register
    handleSubmit: submitForm,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationsSchema),
  });

  const handleSubmit = async (data) => {
    try {
      console.log("Validation all good", data);

      const userData = {
        fristname: data.fristname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      };

      // Dispatch the register action
      await dispatch(registerAction(userData));

      console.log("User registered successfully", userData);

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <div className="register-container">
      <Form className="register-form" onSubmit={submitForm(handleSubmit)}>
        <h2 className="form-title">Register</h2>
        <FormGroup>
          <label htmlFor="fristname" className="form-label">First Name:</label>
          <Input
            id="fristname"
            type="text"
            className="form-control"
            placeholder="First Name"
            {...register("fristname")}
            onChange={(e) => {
              setValue("fristname", e.target.value);
              trigger("fristname");
            }}
          />
          <p className="error">{errors.fristname?.message}</p>
        </FormGroup>
        <FormGroup>
          <label htmlFor="lastname" className="form-label">Last Name:</label>
          <Input
            id="lastname"
            type="text"
            className="form-control"
            placeholder="Last Name"
            {...register("lastname")}
            onChange={(e) => {
              setValue("lastname", e.target.value);
              trigger("lastname");
            }}
          />
          <p className="error">{errors.lastname?.message}</p>
        </FormGroup>
        <FormGroup>
          <label htmlFor="email" className="form-label">Email:</label>
          <Input
            id="email"
            type="email"
            className="form-control"
            placeholder="Email"
            {...register("email")}
            onChange={(e) => {
              setValue("email", e.target.value);
              trigger("email");
            }}
          />
          <p className="error">{errors.email?.message}</p>
        </FormGroup>
        <FormGroup>
          <label htmlFor="password" className="form-label">Password:</label>
          <Input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
            onChange={(e) => {
              setValue("password", e.target.value);
              trigger("password");
            }}
          />
          <p className="error">{errors.password?.message}</p>
        </FormGroup>
        <FormGroup>
          <label htmlFor="confirmpassword" className="form-label">Confirm Password:</label>
          <Input
            id="confirmpassword"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            {...register("confirmpassword")}
            onChange={(e) => {
              setValue("confirmpassword", e.target.value);
              trigger("confirmpassword");
            }}
          />
          <p className="error">{errors.confirmpassword?.message}</p>
        </FormGroup>
        <Button className="register-button" color="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;




