import "../../css/signin/SignInForm.css";
import { InputField } from "../common/InputForm";
import ApiHelper from "../../helper/api-helper";
import { useNavigate } from "react-router-dom";
import { User } from "../../dto/common.dto";
import { useLocation } from "react-router-dom";
import InputForm from "../common/Form";

const EmployeeSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const createNewUserAccount = async (newUser: User) => {
    try {
      if (code) {
        const editUserWithCriteriaRes = await ApiHelper.editUserWithCriteria({
          ...newUser,
          accessString: code,
        });
        if (editUserWithCriteriaRes?.success) {
          navigate("/user/login");
        } else {
          setTimeout(() => alert("Please retry to sign up your account"), 1000);
        }
      }
    } catch (error) {
      console.error(
        `Can't complete creating signing up user account due to ${error}`,
      );
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
      <InputForm
        headerVal="Sign Up"
        paragraphVal="Please enter your username and password to sign up"
        inputs={[userNameInput, passwordInput]}
        onBack={() => null}
        onSubmit={createNewUserAccount}
      />
    </div>
  );
};

export default EmployeeSignUp;
