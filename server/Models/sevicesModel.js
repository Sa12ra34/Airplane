import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  date: { type: Date, required: true },
  numberOfWomen: { type: Number, required: true },
  email: { type: String, required: true } 
});

const ServiceModel = mongoose.model("services", ServiceSchema);
export default ServiceModel;
