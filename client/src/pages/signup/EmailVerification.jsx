import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext"; // Assuming your AuthContext provides authUser

const EmailVerification = () => {
  const { username, token } = useParams();
  const [isValidateToken, setisValidateToken] = useState(false);
  
  const { authUser } = useAuthContext(); // Get the authUser from AuthContext
  const navigate = useNavigate(); // Initialize navigate for redirection

  const verifyEmailToken = async (username, emailToken) => {
    console.log("testing function");
    const usernameAndToken = {
      username: username,
      emailToken: emailToken,
    };

    try {
      const response = await fetch("/api/auth/verifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usernameAndToken),
      });
      const data = await response.json();
      const responseStatus = data.status;
      if (responseStatus === "okay") {
        setisValidateToken(true);
      }
    } catch (error) {
      console.error("Error verifying email token:", error);
    }
  };

  useEffect(() => {
    // Check if the user is authenticated, if not, redirect to /login
    if (!authUser) {
      navigate("/login");
    } else {
      verifyEmailToken(username, token);
    }
  }, [authUser, username, token, navigate]);

  return (
    <div>
      {isValidateToken ? (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
              Email verified
            </h1>
            <div>
              <Link
                to="/login"
                className="text-sm flex items-center justify-center hover:underline hover:text-blue-600 mt-2 inline-block my-auto"
              >
                Click here to {"login"}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Verifying...</h1>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
