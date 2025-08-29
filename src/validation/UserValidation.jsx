export const validateUser = ({ name, email, password }) => {
  const errors = [];

  // Name validation: must be letters only (allow spaces)
  if (!name || !/^[a-zA-Z\s]+$/.test(name.trim())) {
    errors.push("Name should only contain letters and spaces.");
  }

  // Email validation: proper format
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  // Password validation (example rule: min 6 characters)
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return errors;
};
