import BaseInput from "./components/BaseInput/BaseInput";
import styles from "./App.module.scss";

import { FieldValues, useForm } from "react-hook-form";
import BaseCheckbox from "./components/BaseCheckbox/BaseCheckbox";
import { useState } from "react";

const ITEMS = ["item1", "item2", "item3", "item4", "item5", "item6", "item7"];

function App() {
  const { register, handleSubmit } = useForm();

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange =
    (item: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems((prev) =>
        e.target.checked ? [...prev, item] : prev.filter((i) => i !== item)
      );
    };

  const onSubmit = (formValues: FieldValues) => console.log(formValues);

  return (
    <div className={styles.demo}>
      {checkedItems}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.demo__form}>
        <BaseInput
          {...register("item")}
          placeholder="enter something.."
          error="Some Error!"
          variant="text"
        />

        {ITEMS.map((item, index) => (
          <div key={index}>
            <BaseCheckbox
              value={item}
              name={item}
              checked={checkedItems.includes(item)}
              onChange={handleCheckboxChange(item)}
            >
              {item} is here
            </BaseCheckbox>
          </div>
        ))}
      </form>
    </div>
  );
}

export default App;
