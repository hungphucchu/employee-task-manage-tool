import { useContext, useEffect } from 'react';
import '../../css/signin/SignInForm.css';
import ApiHelper from '../../helper/api-helper';
import { useNavigate } from 'react-router-dom';
import { User } from '../../dto/common.dto';
import { useUserContext } from '../context/UserContext';
import { InputField } from '../common/InputForm';
import Form from '../common/Form';


const LogIn = () => {
  const navigate = useNavigate();

  
  const { updateUser } = useUserContext(); // Access the user context

  useEffect(() => {
    const validateToken = async () => {
      if (localStorage.getItem('authToken')){
        const validTokenRes = await ApiHelper.validateToken();
        console.log("validTokenRes = ")
          console.log(validTokenRes)
        if (validTokenRes && validTokenRes.success){
          console.log("validTokenRes?.user = ")
          console.log(validTokenRes?.user)
          updateUser(validTokenRes?.user);
          navigate('/dashboard');
        }else localStorage.removeItem('authToken')
      }
    }
    validateToken();
  },[]);

  const validateLogIn = async (user: User) => {
    try {
      const validateUsername = await ApiHelper.validateUsernameAndPassword(user);
      console.log('Username and password validation result:', validateUsername?.success);
      console.log("validateUsername = ");
      console.log(validateUsername);
      if (validateUsername?.success) {
        updateUser(validateUsername?.user);
        console.log("validateUsername?.user = ")
        console.log(validateUsername?.user)
        const token = validateUsername?.token;
        localStorage.setItem('authToken', token); // Store the token in local storage
        navigate('/dashboard');
      } else {
        console.error('Validation failed:', validateUsername?.message);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const userNameInput: InputField = {
    name: 'username',
    type: 'text',
    placeholder: 'Your User Name'
  };

  const passwordInput: InputField = {
    name: 'password',
    type: 'text',
    placeholder: 'Your password'
  };

  return (
    <div className="signin-container">
       <Form 
                headerVal="Log In" 
                paragraphVal="Please enter your email and password to log in" 
                inputs={[userNameInput, passwordInput]} 
                onBack={() => null}
                onSubmit={validateLogIn}/> 
      
    </div>
  );
};

export default LogIn;
