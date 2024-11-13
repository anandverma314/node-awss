import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for the Employee document
export interface IEmployee extends Document {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  doj?: string;  // Optional field
  createdAt: Date;  // From timestamps option
  updatedAt: Date;  // From timestamps option
}

// Create the schema
const EmployeeSchema: Schema<IEmployee> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    doj: {
      type: String,
    },
  },
  {
    timestamps: true,  // Automatically creates `createdAt` and `updatedAt` fields
  }
);

// Create the model
export const EmployeeModel = mongoose.model<IEmployee>("Employee", EmployeeSchema);
