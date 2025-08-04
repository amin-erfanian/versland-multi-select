import React from "react";
import classNames from "classnames";
import styles from "./BaseInput.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  variant?: "outlined" | "text";
  placeholder?: string;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  error?: string;
  type?: string;
  dir?: "rtl" | "ltr";
  disabled?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      variant = "text",
      prependIcon,
      appendIcon,
      error,
      type = "text",
      dir = "ltr",
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={classNames(styles.input, styles[`input--${variant}`], {
          [styles["input--error"]]: !!error,
          [styles["input--disabled"]]: disabled,
        })}
      >
        {prependIcon && (
          <span
            className={classNames(
              styles.input__icon,
              styles["input__icon--prepend"]
            )}
          >
            {prependIcon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          className={styles.input__field}
          dir={dir}
          disabled={disabled}
          ref={ref}
          {...rest}
        />

        {appendIcon && (
          <span
            className={classNames(
              styles.input__icon,
              styles["input__icon--append"]
            )}
          >
            {appendIcon}
          </span>
        )}

        {error && <div className={styles.input__errorMessage}>{error}</div>}
      </div>
    );
  }
);

export default Input;
