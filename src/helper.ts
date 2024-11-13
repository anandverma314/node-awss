import bcrypt from 'bcryptjs';

// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  // Generate a salt (rounds: 10-12 is recommended)
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const verifyPassword = async (enteredPassword: string, storedPasswordHash: string): Promise<boolean> => {
    console.log(enteredPassword, storedPasswordHash);
    
    const isMatch = await bcrypt.compare(enteredPassword, storedPasswordHash);
    return isMatch;
  };