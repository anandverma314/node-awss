import * as AWS from "aws-sdk";
import { config } from "../config";

AWS.config.update({ region: config.awsRegion });

const cognito = new AWS.CognitoIdentityServiceProvider();

const poolData = {
  UserPoolId: config.userPoolId,
  ClientId: config.clientId,
};

// Function to signup a user
export const signupUserService = async (
  username: string,
  password: string,
  email: string
) => {
  const params = {
    ClientId: poolData.ClientId,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const response = await cognito.signUp(params).promise();
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Function to confirm the user's sign-up with the confirmation code
export const confirmUserEmailService = async (
  username: string,
  confirmationCode: string
) => {
  const params = {
    ClientId: poolData.ClientId,
    Username: username,
    ConfirmationCode: confirmationCode,
  };

  try {
    const response = await cognito.confirmSignUp(params).promise();
    console.log("User email verified successfully:", response);
    return response;
  } catch (error: any) {
    throw new Error(`Error confirming user email: ${error.message}`);
  }
};

// Function to sign in a user
export const signinUserService = async (username: string, password: string) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: poolData.ClientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const response = await cognito.initiateAuth(params).promise();
    return response.AuthenticationResult;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


// Function to initiate the password reset process
export const forgotPasswordService = async (username: string) => {
  const params = {
    ClientId: poolData.ClientId,  // App client ID
    Username: username,           // The user's email or username
  };

  try {
    const response = await cognito.forgotPassword(params).promise();
    return response;
  } catch (error: any) {
    throw new Error(`Error resetting password: ${error.message}`);
  }
};

// Function to check if a user exists in Cognito
const checkUserExists = async (username: string): Promise<boolean> => {
  const params = {
    UserPoolId: poolData.UserPoolId,  // Replace with your Cognito User Pool ID
    Username: username,               // The user's email or username
  };

  try {
    // Attempt to get the user from Cognito
    await cognito.adminGetUser(params).promise();
    return true; // If the user exists, return true
  } catch (error: any) {
    // If Cognito throws UserNotFoundException, the user does not exist
    if (error.code === 'UserNotFoundException') {
      return false;
    }
    // If any other error occurs, throw it for further handling
    throw error;
  }
};