import React, { ReactElement } from 'react';

export interface InputField {
  name: string;
  type: string;
  placeholder: string;
  inputName?: string;
}

interface InputFormProps {
  buttonName: string,
  buttonClassName: string,
  inputs: InputField[];
  onSubmit: (inputVals: Record<string, string>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ buttonName, buttonClassName, inputs, onSubmit }) => {
  const initialState: Record<string, string> = {};
  inputs.forEach((input) => {
    initialState[input.name] = '';
  });
  const [inputVals, setInputVals] = React.useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setInputVals({ ...inputVals, [name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(inputVals);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <div key={input.name} className="input-group">
          {input.inputName && <span>{input.inputName}</span>}
          <input
            type={input.type}
            placeholder={input.placeholder}
            value={inputVals[input.name]}
            onChange={(e) => handleChange(e, input.name)}
          />
        </div>
      ))}
      <button type="submit" className={buttonClassName}>
        {buttonName}
      </button>
    </form>
  );
};

export default InputForm;
