import React from "react";
import styles from "./BaseCheckbox.module.scss";
import classNames from "classnames";

type BaseCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  checked?: boolean;
  children?: React.ReactNode;
};

const BaseCheckbox = React.forwardRef<HTMLInputElement, BaseCheckboxProps>(
  ({ name, checked, children, ...rest }, ref) => {
    return (
      <div
        className={classNames(styles["check-box"], {
          [styles["check-box--checked"]]: checked,
        })}
      >
        <input
          ref={ref}
          className={styles["check-box__icon-check"]}
          type="checkbox"
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
