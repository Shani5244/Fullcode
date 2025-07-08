// src/utils/isProviderLoggedIn.js
const isProviderLoggedIn = () => {
  const provider = localStorage.getItem('loggedInProvider');
  return provider ? true : false;
};

export default isProviderLoggedIn;
