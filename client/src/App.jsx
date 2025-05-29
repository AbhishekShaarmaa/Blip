import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import EmailVerification from "./pages/signup/EmailVerification";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Messages from "./pages/signup/message";
import { useAuthContext } from "./context/AuthContext";
import Footer from "./components/footer/Footer";

export default function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/verifyUserEmail/:username/:token"
            element={<EmailVerification />}
          />
          <Route path="/verifyUserEmail/messages" element={<Messages />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={
              authUser ? (
                <Navigate to="/verifyUserEmail/messages" />
              ) : (
                <SignUp />
              )
            }
          />
        </Routes>
        <Toaster position="top-left" reverseOrder={false} />
      </div>

      <Footer />
    </>
  );
}
