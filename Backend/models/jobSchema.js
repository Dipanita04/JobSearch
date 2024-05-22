import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide tilte of job"],
    minLength: [3, "Job title must contain at least 3 characters!"],
    minLength: [10, "Job title cannot exceed 10 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    minLength: [10, "Description must contain at least 10 characters!"],
    minLength: [30, "Description cannot exceed 30 characters!"],
  },
  category: {
    type: String,
    required: [true, "Job category is required!"],
  },
  country: {
    type: String,
    required: [true, "Job Country is required!"],
  },
  city: {
    type: String,
    required: [true, "Job city is required!"],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location!"],
    minLength: [10, "Job location must contain at least 20 characters!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed salary must contain at least 4 digits!"],
    maxlength: [5, "Fixed salary cannot exceed 9 digits!"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits!"],
    maxlength: [5, "Salary from cannot exceed 9 digits!"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
