import mongoose from "mongoose";

// Define the form schema with validation and field types
const formSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true, // Example: Form type should be required
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v); // Basic email validation
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v); // Basic phone validation (adjust regex as needed)
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  businessName: {
    type: String,
  },
  teamName: {
    type: String,
  },
  teamCategory: {
    type: String,
  },
  businessDescription: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
  dob: {
    type: Date,
    required: true, // Make sure to specify this as required if needed
  },
  guardianFirstName: {
    type: String,
  },
  guardianLastName: {
    type: String,
  },
  waiverFile: {
    type: String, // Changed to String for storing the URL
  },
});

// Ensure the model is only created once
const Form = mongoose.models.Form || mongoose.model("Form", formSchema);

export default Form;
