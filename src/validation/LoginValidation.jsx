export const validatelogin = ({ email, password }) => {
  const errors = [];

  // Check if email exists and is in correct format
  if (!email) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format");
    }
  }

  // Check if password exists and meets criteria
  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  } else if (!/[A-Z]/.test(password)) {
    // errors.push("Password must include at least one uppercase letter");
  } else if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number");
  }

  return errors;
};
 