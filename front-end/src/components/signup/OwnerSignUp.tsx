import React, { useState } from 'react';
import '../../css/signin/SignInForm.css';
import SignInBox from '../common/Form'; // Import InputField type from SignInBox
import ApiHelper from '../../helper/api-helper';
import { useNavigate } from 'react-router-dom';
import { User } from '../../dto/common.dto';
import InputForm from '../common/Form';
import { useUserContext } from '../context/UserContext';
import { InputField } from '../common/InputForm';

const OwnerSignUp = () => {
  const [emailSignIn, setEmailSignIn] = useState(true);
  const [accessCodeRequest, setAccessCodeRequest] = useState<User>({});
  const navigate = useNavigate();
  const { updateUser } = useUserContext(); 

  const createNewAccessCode = async (request: User) => {
    setAccessCodeRequest(request);
    const accessCode = await ApiHelper.createNewAccessCode(request);
    console.log('New access code created:', accessCode);
    setEmailSignIn(false);
  };

  const validateAccessCode = async ({accessCode}: Record<string, string>) => {
    const validateAccessCodeReq = { accessCode, ...accessCodeRequest };
    const validateAccessCode = await ApiHelper.validateAccessCode(validateAccessCodeReq);
    console.log('Access code validation result:', validateAccessCode?.success);
    
    if (validateAccessCode?.success) {
      updateUser(validateAccessCode?.user);
      localStorage.setItem('authToken', validateAccessCode.token);
      navigate('/dashboard');
    }
  };

  const emailInput: InputField = {
    name: 'email',
    type: 'text',
    placeholder: 'Your Email'
  };

  const accessCodeInput: InputField = {
    name: 'accessCode',
    type: 'text',
    placeholder: 'Enter your code'
  };

  return (
    <div className="signin-container">
      {emailSignIn ? 
       <InputForm
                key="email-sign-in"
                headerVal="Sign In" 
                paragraphVal="Please enter your email to sign in" 
                inputs={[emailInput]} 
                onBack={() => null}
                onSubmit={createNewAccessCode}>
          <>
            <p className="passwordless-info">passwordless authentication methods.</p>
            <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a>
          </p>
          </>
        </InputForm> 
      :
       <InputForm
                key="access-code-verify"
                headerVal="Email Verification" 
                paragraphVal="Please enter your code that sent to your email" 
                inputs={[accessCodeInput]} 
                onBack={() => setEmailSignIn(true)}
                onSubmit={validateAccessCode}
        >
             <>
            <p className="passwordless-info">passwordless authentication methods.</p>
            <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a>
          </p>
          </>
        </InputForm> 
      }
    </div>
  );
};

export default OwnerSignUp;
