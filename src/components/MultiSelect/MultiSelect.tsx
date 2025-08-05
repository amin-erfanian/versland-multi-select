import { useState, useRef, useEffect } from "react";
import styles from "./MultiSelect.module.scss";
import BaseCheckbox from "../BaseCheckbox/BaseCheckbox";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

const MultiSelect = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["multi-select"]} ref={dropdownRef}>
      <div
        className={styles["multi-select__select-box"]}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles["multi-select__selected-label"]}>
          {selectedValues.length > 0
            ? `${selectedValues.length} Selected`
            : placeholder}
        </span>
        <span className={styles["multi-select__arrow"]}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {isOpen && (
        <div className={styles["multi-select__dropdown"]}>
          {options.map((option, index) => {
            const uniqueId = `multi-checkbox-${index}-${option.value}`;
            return (
              <label key={index} className={styles.option}>
                <BaseCheckbox
                  value={option.value}
                  name={uniqueId}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
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

export default MultiSelect;
