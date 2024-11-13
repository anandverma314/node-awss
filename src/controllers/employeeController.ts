import { Request, Response } from "express";
import { EmployeeModel } from "../models/employee";

// Define the controller functions get all data
const getAllEmployee: any = async (request: Request, response: Response) => {
  try {
    const employees = await EmployeeModel.find();
    return response.status(200).json({ data: employees });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// Define the controller functions get one data
const getEmployee: any = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return response.status(404).json({ error: "Employee not found" });
    }
    return response.status(200).json({ data: employee });
  } catch (error) {
    console.error(error);
    return response.status(400).json({ error: "Invalid employee ID" });
  }
};

// Define the controller functions create data
const createEmployee: any = async (request: Request, response: Response) => {
  try {
    const { name, email, mobile, dob, doj } = request.body;

    if (!name || !email || !mobile || !dob || !doj) {
      return response.status(400).json({ error: "All fields are required" });
    }

    // Check if an employee with the same email already exists
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return response.status(400).json({ error: "Email is already exits." });
    }

    const employee = new EmployeeModel({ name, email, mobile, dob, doj });
    await employee.save();
    return response
      .status(201)
      .json({ message: "Employee created", data: employee });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// Define the controller functions update data
const updateEmployee: any = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, mobile, dob, doj } = request.body;

    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return response.status(404).json({ error: "Employee not found" });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.dob = dob || employee.dob;
    employee.doj = doj || employee.doj;

    await employee.save();
    return response
      .status(200)
      .json({ message: "Employee updated", data: employee });
  } catch (error) {
    console.error(error);
    return response.status(400).json({ error: "Invalid employee ID or data" });
  }
};

// Define the controller functions delete data
const deleteEmployee: any = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const employee = await EmployeeModel.findByIdAndDelete(id);
    if (!employee) {
      return response.status(404).json({ error: "Employee not found" });
    }
    return response.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    console.error(error);
    return response.status(400).json({ error: "Invalid employee ID" });
  }
};

// Export the functions
export {
  getAllEmployee,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
