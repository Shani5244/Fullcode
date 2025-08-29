  import React,{useEffect} from "react";
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
  } from "react-router-dom";
  // import { getPost } from "./API";

  // Pages
  import About from "./pages/Other_Data/About";
  import Home from "./pages/Other_Data/Home";
  import Services from "./pages/Services_Data/Services";
  import Contact from "./pages/Other_Data/Contact";
  import Details from "./pages/Other_Data/Details";
  import Login from "./pages/User_Data/LoginForm";
  import Register from "./pages/User_Data/RegisterForm";
  import Menu from "./pages/Other_Data/Menu";
  import BookingHistory from "./pages/Booking_Data/BookingHistory";
  import RatingsReviews from "./pages/Rating_Data/RatingsReviews";
  import RequestManager from "./ServicesProvider/RequestManager";
  import ServiceStatus from "./pages/Services_Data/ServiceStatus";
  import EarningsReport from "./ServicesProvider/EarningsReport";
  import ServiceFilter from "./pages/Services_Data/ServiceFilter";
  import PaymentOptions from "./pages/Other_Data/PaymentOptions";
  import AdminPanel from "./pages/Admin_Data/AdminPanel";
  import Terms from "./pages/Other_Data/Terms_Conditions";
  import Privacy from "./pages/Other_Data/PrivacyPolicy";
  import LiveChat from "./pages/Other_Data/LiveChat";
  import Dashboard from "./pages/Admin_Data/AdminDashboard/Dashboard";
  import ServiceList from "./pages/Services_Data/ServiceList";
  import AddService from "./pages/Services_Data/Servicess/AddService";
  import EditService from "./pages/Services_Data/Servicess/EditService";
  import BookingConfirmation from "./pages/Booking_Data/BookingConfirmation";
  import SearchHistory from "./pages/Search_Data/SearchHistory";
  import BookingPage from "./pages/Booking_Data/BookingPage";
  import BookingStatus from "./pages/Booking_Data/BookingStatus";
  import SearchResults from "./pages/Search_Data/SearchResults";
  import ProviderRequests from "./ServicesProvider/ProviderRequests";
  import ProviderRegister from "./ServicesProvider/RegisterForm";
  import ProviderLogin from "./ServicesProvider/LoginForm";
  import ProviderDashboard from "./ServicesProvider/ProviderDashboard";
  import ManageProfile from './ServicesProvider/ManageProfile';
  import LocationPage from "./pages/Location_Data/LocationPage";
  import Cart from "./components/Cart"; // ✅ Cart page
  // import ProviderList from "./pages/ProviderList";

  // Contexts
  import { ThemeProvider } from './context/ThemeContext';
  import { CartProvider } from './context/CartContext';

  // Components
  import Footer from "./components/Footer";
  import Navbar from "./components/Navbar";
  import Profile from "./pages/Location_Data/LocationProfile";
  import { getProviderList } from "./API/providerApi"; // adjust path if needed

  function AppWrapper() {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const hideNavbarPaths = ["/login", "/register"];

    return (
      <>
        {!hideNavbarPaths.includes(location.pathname.toLowerCase()) && <Navbar />}

        <Routes>
          {/* Protected Route */}
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/bookingconfirmation" element={<BookingConfirmation />} />
          <Route path="/searchhistory" element={<SearchHistory />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/payment" element={<PaymentOptions />} />
          <Route path="/about" element={<About />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
          <Route path="/ratings" element={<RatingsReviews />} />
          <Route path="/requests" element={<RequestManager />} />
          <Route path="/status" element={<ServiceStatus />} />
          <Route path="/earnings" element={<EarningsReport />} />
          <Route path="/filter" element={<ServiceFilter />} />
          <Route path="/servicelist" element={<ServiceList />} />
          <Route path="/services/add" element={<AddService />} />
          <Route path="/services/edit/:id" element={<EditService />}  />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/bookingstatus" element={<BookingStatus />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/provider/requests" element={<ProviderRequests />} />
          <Route path="/provider-register" element={<ProviderRegister />} />
          <Route path="/provider-login" element={<ProviderLogin />} />
          <Route path="/provider/dashboard/*" element={<ProviderDashboard />} />
          <Route path="/provider/profile" element={<ManageProfile />} />
          <Route path="/cart" element={<Cart />} /> {/* ✅ Cart route */}

          {/* Fallback */}
          {/* <Route path="*" element={<Navigate to="/home" />} /> */}
        </Routes>
      </>
    );
  }
  function App() {
    useEffect(() => {
      const fetchData = async () => {
        const data = await getProviderList();
        console.log("Fetched Providers:", data);
      };

      fetchData();
    }, []);

    return (
      <ThemeProvider>
        <CartProvider>
          <Router>
            <LiveChat />
            <AppWrapper />
            <Footer />
          </Router>
        </CartProvider>
      </ThemeProvider>
    );
  }

  export default App;


