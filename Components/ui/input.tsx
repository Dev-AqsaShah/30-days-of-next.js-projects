interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const Input: React.FC<InputProps> = ({ type, value, onChange }) => {
    return <input type={type} value={value} onChange={onChange} />;
  };
  