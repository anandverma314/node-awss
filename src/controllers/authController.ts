import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { sign } from "jsonwebtoken";
import { JWT_KEY } from "../constant";
import bcryptjs from "bcryptjs";
import { hashPassword, verifyPassword } from "../helper";

const signUp = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { name, email, password, role } = user;

    // Check the email all ready exist  in database or not ;
    const isEmailAllReadyExist = await UserModel.findOne({
      email: email,
    });

    // Add a condition if the user exist we will send the response as email all ready exist
    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email all ready in use",
      });
      return;
    }

    // now create the user;
    const newUser = await UserModel.create({
      name,
      email,
      password: await hashPassword(password),
      role,
    });

    // Send the newUser as  response;
    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { email, password } = user;

    // Check the (email/user) exist  in database or not ;
    const isUserExist = await UserModel.findOne({
      email: email,
    });

    // if there is not any user we will send user not found;
    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    // if the (user) exist  in database we will check the password is valid or not ;
    // compare the password in db and the password sended in the request body
    const isPasswordMatched = await verifyPassword(password, isUserExist?.password);

    // if not matched send response that wrong password;
    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }

    // if the email and password is valid create a token
    /*
        To create a token JsonWebToken (JWT) receive's 3 parameter
        1. Payload -  This contains the claims or data you want to include in the token.
        2. Secret Key - A secure key known only to the server used for signing the token.
        3. expiration -  Additional settings like token expiration or algorithm selection.
        */

    // This is our JWT Token
    const token = sign(
      {
        _id: isUserExist?._id,
        email: isUserExist?.email,
        name: isUserExist?.name,
        role: isUserExist?.role,
      },
      JWT_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

// signOut controller (client handles token removal)
const signOut = (req: Request, res: Response) => {
  // Server doesn't need to do anything in the case of JWT (token is stateless)
  // The client is responsible for deleting the token from localStorage, cookies, or sessionStorage

  res.status(200).json({
    message: "Logout successful. Please remove the token from the client-side.",
  });
};

export { signUp, signIn, signOut };
