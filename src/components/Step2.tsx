import React from "react";
import { FormEvent } from "react";

function SearchRaceForm({
  onRaceNameChange,
}: {
  onRaceNameChange: (race: string) => void;
}) {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onRaceNameChange(formData.get("race") as string);
  };
  return (
    <form onSubmit={submitHandler}>
      <label>
        Race:
        <input type="text" name="race" />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

function RaceDetails() {
  return <div>todo</div>;
}

export function Step2() {
  const [raceName, setRaceName] = React.useState("");

  return (
    <main>
      <SearchRaceForm onRaceNameChange={setRaceName} />
      <p>{raceName}</p>
      <RaceDetails />
    </main>
  );
}
