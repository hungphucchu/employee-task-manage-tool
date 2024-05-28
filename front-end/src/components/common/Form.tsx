import React, { ReactElement } from 'react';
import InputForm, { InputField } from './InputForm';

const Form: React.FC<{
  headerVal: string;
  paragraphVal: string;
  inputs: InputField[];
  onBack: () => void;
  onSubmit: (inputVals: Record<string, string>) => void;
  children?: ReactElement;
}> = ({ headerVal, paragraphVal, inputs, onBack, onSubmit, children }) => {
  return (
    <div className="signin-box">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <h2>{headerVal}</h2>
      <p>{paragraphVal}</p>
      <InputForm inputs={inputs} onSubmit={onSubmit} buttonClassName='next-button' buttonName='Next' />
      {children}
    </div>
  );
};

export default Form;
