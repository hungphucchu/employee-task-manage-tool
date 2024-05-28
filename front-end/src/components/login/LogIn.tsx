import { useEffect } from "react";
import "../../css/signin/SignInForm.css";
import ApiHelper from "../../helper/api-helper";
import { useNavigate } from "react-router-dom";
import { User } from "../../dto/common.dto";
import { useUserContext } from "../context/UserContext";
import { InputField } from "../common/InputForm";
import Form from "../common/Form";

const LogIn = () => {
  const navigate = useNavigate();

  const { updateUser } = useUserContext();

  useEffect(() => {
    const validateToken = async () => {
      if (localStorage.getItem("authToken")) {
        const validTokenRes = await ApiHelper.validateToken();
        if (validTokenRes && validTokenRes.success) {
          updateUser(validTokenRes?.user);
          navigate("/dashboard");
        } else localStorage.removeItem("authToken");
      }
    };
    validateToken();
  }, []);

  const validateLogIn = async (user: User) => {
    try {
      const validateUsername =
        await ApiHelper.validateUsernameAndPassword(user);
      if (validateUsername?.success) {
        updateUser(validateUsername?.user);
        const token = validateUsername?.token;
        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      } else {
        console.error("Validation failed:", validateUsername?.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const userNameInput: InputField = {
    name: "username",
    type: "text",
    placeholder: "Your User Name",
  };

  const passwordInput: InputField = {
    name: "password",
    type: "text",
    placeholder: "Your password",
  };

  return (
    <div className="signin-container">
      <Form
        headerVal="Log In"
        paragraphVal="Please enter your username and password to log in"
        inputs={[userNameInput, passwordInput]}
        onBack={() => null}
        onSubmit={validateLogIn}
      />
    </div>
  );
};

export default LogIn;
