import { useState, useEffect, useRef } from "react";
import classes from "./Fields.module.scss";
import { hideEyeSVG, showEyeSVG } from "../../assets";

export interface IInputFieldProps {
  id?: string;
  placeholder?: string;
  name?: string;
  label?: string;
  value?: string | number;
  type?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
  register?: any; // Accept the register function as a prop
  validation?: any; // Accept validation rules as a prop
}

function InputField({
  id,
  label,
  placeholder,
  value,
  type = "text",
  className,
  disabled,
  onChange,
  required,
  name,
  register,
  validation,
  ...inputProps
}: IInputFieldProps) {
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    }
  }, [value]);

  const handleBlur = () => {
    if (!inputRef.current?.value) {
      setIsFocused(false);
    }
  };

  return (
    <div className={`${classes.input__container} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`${classes.input__label} ${isFocused ? classes.input__label_float : ""}`}
        >
          {label}
        </label>
      )}
      {type === "password" ? (
        <div className={classes.input__field_password}>
          <input
            ref={inputRef}
            id={id}
            required={required}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            disabled={disabled}
            type={isPasswordShow ? "text" : "password"}
            name={name}
            {...(register ? register(name, validation) : {})} // Register input with react-hook-form
            className={classes.input__field}
            {...inputProps}
          />
          <img
            aria-hidden
            src={isPasswordShow ? showEyeSVG : hideEyeSVG}
            onClick={() => setIsPasswordShow(!isPasswordShow)}
            alt=""
            className={classes.input__toggle_password}
          />
        </div>
      ) : (
        <input
          ref={inputRef}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          {...(register ? register(name, validation) : {})} // Register input with react-hook-form
          disabled={disabled}
          name={name}
          type={type}
          className={classes.input__field}
          {...inputProps}
        />
      )}
    </div>
  );
}

export default InputField;
