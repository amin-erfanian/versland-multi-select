import { useState, useRef } from "react";
import styles from "./BaseSelect.module.scss";
import BaseCheckbox from "../BaseCheckbox/BaseCheckbox";
import { useClickOutside } from "../../hooks/useClickOutside";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
};

const BaseSelect = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  multiple = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    if (multiple) {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    } else {
      onChange([value]);
      setIsOpen(false);
    }
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles["select"]} ref={dropdownRef}>
      <div
        className={styles["select__select-box"]}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles["select__selected-label"]}>
          {selectedValues.length > 0
            ? multiple
              ? `${selectedValues.length} Selected`
              : options.find((opt) => opt.value === selectedValues[0])?.label
            : placeholder}
        </span>
        <span className={styles["select__arrow"]}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={styles["select__dropdown"]}>
          {options.map((option, index) => {
            const uniqueId = `multi-checkbox-${index}-${option.value}`;
            return (
              <label key={index} className={styles.option}>
                <BaseCheckbox
                  value={option.value}
                  name={multiple ? uniqueId : "single-select"}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  type={multiple ? "checkbox" : "radio"}
                >
                  {option.label}
                </BaseCheckbox>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BaseSelect;
