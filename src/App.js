import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
// Pages
import About from "./pages/About/index";
import Home from "./pages/Home/index";
import Services from "./pages/Services/index";
import Contact from "./pages/Contact/index";
import Details from "./pages/Details/index";
import Login from "./pages/LoginForm/index";
import Register from "./pages/RegisterForm/index";
import Menu from "./pages/Menu/index";
import BookingHistory from "./pages/BookingHistory/index";
import RatingsReviews from "./pages/RatingsReviews/index";
import RequestManager from "./pages/RequestManager/index";
import ServiceStatus from "./pages/ServiceStatus/index";
import EarningsReport from "./pages/EarningsReport/index";
import ServiceFilter from "./pages/ServiceFilter/index";

import PaymentOptions from "./pages/PaymentOptions/index";

import AdminPanel from "./pages/AdminPanel/index";
import Terms from "./pages/Terms_Conditions/index";
import Privacy from "./pages/PrivacyPolicy/index";
import LiveChat from "./pages/LiveChat/index";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import ServiceList from "./pages/ServiceList/index";
import AddService from "./pages/Servicess/AddService";
import EditService from "./pages/Servicess/EditService";
import BookingConfirmation from "./pages/BookingConfirmation";
import SearchHistory from "./pages/SearchHistory";
import BookingPage from "./pages/BookingPage";
import BookingStatus from "./pages/BookingStatus";
import SearchResults from "./pages/SearchResults";

import ProviderRegister from "./ServicesProvider/RegisterForm";
import ProviderLogin from "./ServicesProvider/LoginForm";
import ProviderDashboard from "./ServicesProvider/ProviderDashboard";
// import SearchHistoryPage from './pages/SearchHistory';
// import CitySearch from "./pages/CitySearch";
// import LocationForm from './pages/LocationForm';
import LocationPage from "./pages/LocationPage";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/index";
import Profile from "./components/Profile/index";

function AppWrapper() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const hideNavbarPaths = ["/login", "/register"];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname.toLowerCase()) && (
        <>
          <Navbar />
        </>
      )}

      <Routes>
        {/* Protected Route */}
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
        <Route path="/SearchHistory" element={<SearchHistory />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/Search" element={<SearchResults />} />
        <Route path="/AdminDashboard" element={<Dashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/payment" element={<PaymentOptions />} />

        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/BookingHistory" element={<BookingHistory />} />
        <Route path="/Ratings" element={<RatingsReviews />} />
        <Route path="/Requests" element={<RequestManager />} />
        <Route path="/Status" element={<ServiceStatus />} />
        <Route path="/Earnings" element={<EarningsReport />} />
        <Route path="/Filter" element={<ServiceFilter />} />
        <Route path="/Services" element={<ServiceList />} />
        <Route path="/Services/add" element={<AddService />} />
        <Route path="/Services/edit/:id" element={<EditService />} />
        <Route path="/Sooking" element={<BookingPage />} />
        <Route path="/BookingStatus" element={<BookingStatus />} />
        <Route path="/Location" element={<LocationPage />} />

        <Route path="/provider-register" element={<ProviderRegister />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        {/* <Route path="/SearchHistory" element={<SearchHistory/>} */}
        {/* <Route path="/services/:city" element={<CityServices />} /> */}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* <CitySearch /> */}
      {/* <LocationForm /> */}
      {/* <SearchBar /> */}
      <LiveChat />
      <AppWrapper />
      <Footer />
    </Router>
  );
}

export default App;
