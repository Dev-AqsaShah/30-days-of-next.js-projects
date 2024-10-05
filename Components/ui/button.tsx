interface ButtonProps {
    label: string;
    onClick: () => void;
  }
  
  export const Button: React.FC<ButtonProps> = (props) => {
    return <button onClick={props.onClick}>{props.label}</button>;
  };
  