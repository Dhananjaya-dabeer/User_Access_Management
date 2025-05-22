import AuthProvider from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Bounce, Flip, ToastContainer } from "react-toastify";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RequestAccess from "./components/RequestAccess";
import MyRequests from "./components/MyRequests";
import PendingRequests from "./components/PendingRequest";
import CreateSoftware from "./components/CreateSoftware";
function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup"];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-access" element={<RequestAccess />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="/create-software" element={<CreateSoftware />} />
      </Routes>
    </>
  );
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </AuthProvider>
  );
}
export default App;
