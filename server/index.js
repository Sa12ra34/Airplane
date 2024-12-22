import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import ServiceModel from "./Models/sevicesModel.js";
import bcrypt from "bcrypt";
import { dirname } from "path";
import multer from "multer";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";


const app = express();
app.use(express.json());
app.use(cors());


const connectString = "mongodb+srv://sumayahamed9115:1234@clustersalon.f4ihy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSalon";

mongoose.connect(connectString);
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Set up middleware to serve static files from the 'uploads' directory
// Requests to '/uploads' will serve files from the local 'uploads' folder
app.use("/uploads", express.static(__dirname + "/uploads"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
const upload = multer({ storage: storage });

app.post("/register", async (req, res) => {
    try {
        const fristname = req.body.fristname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const hashedpassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            fristname: fristname,
            lastname: lastname,
            email: email,
            password: hashedpassword
        });
        await user.save();
        res.send({ user: user, msg: "Added." });


    } catch (error) {
        res.status(500).json({ error: error });

    }
})
// app.post("/services", async (req, res) => {
//     try {
//       const { serviceName, date, numberOfWomen } = req.body;
  
//       const service = new ServiceModel({
//         serviceName: serviceName,
//         date: new Date(date), // Convert string date to Date object
//         numberOfWomen: numberOfWomen,
//       });
  
//       await service.save(); // Save the service in the database
//       res.status(201).send({ service: service, msg: "Service Added Successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to add service" });
//     }
//   });

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(500).json({ error: "user not found" });
        }
        console.log(user);

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });

        }
        res.status(200).json({ user, message: "Success." });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})
app.post('logout', async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" })
});

// app.get("/get-selected-services", async (req, res) => {
//     try {
//         // Replace this with actual user identification, e.g., from a token or session
//         const userEmail = req.query.email;

//         const selectedServices = await ServiceModel.find({ email: userEmail });
//         res.status(200).json({ selectedServices });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// app.get("/getservices", async (req, res) => {
//     try {
//         // const { email } = req.query;  // Get the email from the query parameters
        
//         // if (!email) {
//         //     return res.status(400).json({ error: "Email is required" });
//         // }

//         // // Fetch services that belong to the specific email
//         // const services = await ServiceModel.find({ email: email });

//         // If no services found, return a message
//         if (services.length === 0) {
//             return res.status(404).json({ message: "No services found for this email" });
//         }

//         // Send the services back as a response
//         res.status(200).json({ services });
//     } catch (error) {
//         // If there is an error, send a 500 status code with the error message
//         res.status(500).json({ error: "Failed to fetch services" });
//     }
// });
app.post("/saveService", async (req, res) => {
    try {
       
        const serviceName=req.body.serviceName;
        const date=req.body.date;
        const numberOfWomen=req.body.numberOfWomen;
        const email=req.body.email;

        const saveSer=new ServiceModel({
          serviceName:serviceName,
          date:new Date(date),
          numberOfWomen:numberOfWomen,
          email:email
        })

        await saveSer.save();
        res.status(201).send({ services: saveSer, msg: "Service Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add service" });
    }
});
app.get("/getservices", async (req, res) => {
    try {
        const services = await ServiceModel.find(); // Fetch all services
        if (services.length === 0) {
            return res.status(404).json({ message: "No services found" });
        }
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch services" });
    }
});
app.put(
    "/updateUserProfile/:email/",
    upload.single("profilePic"),
    async (req, res) => {
      const email = req.params.email;
      const fristname = req.body.fristname;
      const lastname = req.body.lastname;
      const password = req.body.password;
  
      try {
        // Find the user by email in the database
        const userToUpdate = await UserModel.findOne({ email: email });
  
        // If the user is not found, return a 404 error
        if (!userToUpdate) {
          return res.status(404).json({ error: "User not found" });
        }
  
        // Check if a file was uploaded and get the filename
        let profilePic = null;
        if (req.file) {
          profilePic = req.file.filename; // Filename of uploaded file
          // Update profile picture if a new one was uploaded but delete first the old image
          if (userToUpdate.profilePic) {
            const oldFilePath = path.join(
              __dirname,
              "uploads",
              userToUpdate.profilePic
            );
            fs.unlink(oldFilePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("Old file deleted successfully");
              }
            });
            userToUpdate.profilePic = profilePic;
          }
        } else {
          console.log("No file uploaded");
        }
  
        
        userToUpdate.fristname = fristname;
        userToUpdate.lastname = lastname;

  
        
        if (password !== userToUpdate.password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          userToUpdate.password = hashedPassword;
        } else {
          userToUpdate.password = password; 
        }
  
        await userToUpdate.save();
  
        res.send({ user: userToUpdate, msg: "Updated." });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  );

  app.put("/updateServices/:email/",
    upload.single("service"),
    async (req, res) => {
      const email = req.params.email;
    
      const date = req.body.date;
      const numberOfWomen = req.body.numberOfWomen;
  
      try {
        
        const serivesUpdate = await UserModel.findOne({ email: email });

        if (!serivesUpdate) {
          return res.status(404).json({ error: "Service not found" });
        }
  
        // Check if a file was uploaded and get the filename
        let service = null;
        if (req.file) {
          service = req.file.filename; // Filename of uploaded file
          // Update profile picture if a new one was uploaded but delete first the old image
          if (serivesUpdate.service) {
            const oldFilePath = path.join(
              __dirname,
              "uploads",
              serivesUpdate.service
            );
            fs.unlink(oldFilePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("Old file deleted successfully");
              }
            });
            serivesUpdate.service = service;
          }
        } else {
          console.log("No file uploaded");
        }
  
        
        serivesUpdate.date = date;
        serivesUpdate.numberOfWomen = numberOfWomen;

  
    
  
        await serivesUpdate.save();
  
        res.send({ service: serivesUpdate, msg: "Updated." });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  );

  let services = [
    { _id: "1", serviceName: "Facial", email: "example@example.com", date: new Date(), numberOfWomen: 2 },
    { _id: "2", serviceName: "Spa", email: "test@test.com", date: new Date(), numberOfWomen: 3 },
  ];
  
  app.get("/getservices", (req, res) => {
    res.json({ services });
  });
  
  app.delete("/deleteservice/:id", (req, res) => {
    const { id } = req.params;
    const index = services.findIndex((service) => service._id === id);
    if (index !== -1) {
      services.splice(index, 1);
      return res.status(200).json({ message: "Service deleted successfully" });
    }
    return res.status(404).json({ error: "Service not found" });
  });

app.listen(3001, () => { console.log("You are connected") })