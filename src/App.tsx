import BaseInput from "./components/BaseInput/BaseInput";
import styles from "./App.module.scss";

import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import BaseSelect, { Option } from "./components/BaseSelect/BaseSelect";

const INITIAL_OPTIONS: Option[] = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Ripple", value: "XRP" },
  { label: "Solana", value: "SOL" },
  { label: "Dogecoin", value: "DOGE" },
];

function App() {
  const { register, handleSubmit, reset } = useForm();

  const [options, setOptions] = useState<Option[]>(INITIAL_OPTIONS);
  const [selected, setSelected] = useState<string[]>([]);

  const onSubmit = (formValues: FieldValues) => {
    setOptions((prev) => [
      ...prev,
      { label: formValues.item, value: formValues.item.toUpperCase() },
    ]);
    reset();
  };

  return (
    <div className={styles.content}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content__form}>
        <BaseInput
          {...register("item")}
          placeholder="Add new item.."
          variant="outlined"
        />

        <BaseSelect
          options={options}
          selectedValues={selected}
          onChange={setSelected}
          multiple
        />
      </form>
    </div>
  );
}

export default App;
