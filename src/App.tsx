import BaseInput from "./components/BaseInput/BaseInput";
import styles from "./App.module.scss";

import { FieldValues, useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (formValues: FieldValues) => console.log(formValues);

  return (
    <div className={styles.demo}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.demo__form}>
        <BaseInput
          {...register("item")}
          placeholder="enter something.."
          error="Some Error!"
          variant="text"
        />
      </form>
    </div>
  );
}

export default App;
