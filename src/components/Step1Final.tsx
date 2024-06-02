import React from "react";
import { FormEvent } from "react";

export function Step1() {
  const [raceName, setRaceName] = React.useState("");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setRaceName(formData.get("race") as string);
  };

  return (
    <main>
      <form onSubmit={submitHandler}>
        <label>
          Race:
          <input type="text" name="race" />
        </label>
        <button type="submit">Search</button>
      </form>
      <p>{raceName}</p>
    </main>
  );
}
