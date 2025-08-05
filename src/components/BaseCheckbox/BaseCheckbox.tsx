import React from "react";
import styles from "./BaseCheckbox.module.scss";
import classNames from "classnames";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  type?: "checkbox" | "radio";
  checked?: boolean;
  children?: React.ReactNode;
};

const BaseCheckbox = React.forwardRef<HTMLInputElement, Props>(
  ({ name, checked, children, type = "checkbox", ...rest }, ref) => {
    return (
      <div
        className={classNames(styles["check-box"], {
          [styles["check-box--checked"]]: checked,
        })}
      >
        <input
          ref={ref}
          className={styles["check-box__icon-check"]}
          type={type}
          name={name}
          id={name}
          checked={checked}
          {...rest}
        />
        <label htmlFor={name} className={styles["check-box__label"]}>
          {children}
        </label>
      </div>
    );
  }
);

BaseCheckbox.displayName = "BaseCheckbox";
export default BaseCheckbox;
