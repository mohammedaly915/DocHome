// Function to validate email format
export const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  // Function to validate password format
  export const validatePassword = async (password) => {
    const checks = {
      containsNumber: new Promise((resolve, reject) => {
        /\d/.test(password) ? resolve(true) : reject('Password must include at least one number.');
      }),
      containsLowercase: new Promise((resolve, reject) => {
        /[a-z]/.test(password) ? resolve(true) : reject('Password must include at least one lowercase letter.');
      }),
      containsUppercase: new Promise((resolve, reject) => {
        /[A-Z]/.test(password) ? resolve(true) : reject('Password must include at least one uppercase letter.');
      }),
      containsSpecial: new Promise((resolve, reject) => {
        /[!@#$%^&*]/.test(password) ? resolve(true) : reject('Password must include at least one special character.');
      }),
      minLength: new Promise((resolve, reject) => {
        password.length >= 8 ? resolve(true) : reject('Password must be at least 8 characters long.');
      }),
    };
  
    return checks;
  };
  