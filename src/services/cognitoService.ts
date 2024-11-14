import * as AWS from 'aws-sdk';
import { config } from '../config';

AWS.config.update({ region: config.awsRegion });

const cognito = new AWS.CognitoIdentityServiceProvider();

const poolData = {
  UserPoolId: config.userPoolId,
  ClientId: config.clientId,
};

// Function to signup a user
export const signupUser = async (username: string, password: string, email: string) => {
  const params = {
    ClientId: poolData.ClientId,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const response = await cognito.signUp(params).promise();
    return response;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

// Function to sign in a user
export const signinUser = async (username: string, password: string) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: poolData.ClientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const response = await cognito.initiateAuth(params).promise();
    return response.AuthenticationResult;
  } catch (error:any) {
    throw new Error(error.message);
  }
};
