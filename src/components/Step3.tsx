import React from "react";
import { FormEvent } from "react";
import raceApi, { Race } from "../models/raceApi";

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
  const [race, setRace] = React.useState<Race | undefined>(undefined);
  const [isloading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchRace = async () => {
      setIsLoading(true);
      const data = await raceApi.get("r1c7");
      setRace(data);
      setIsLoading(false);
    };
    fetchRace();
  }, []);

  if (isloading) {
    return <div>Loading...</div>;
  }

  return <pre>{JSON.stringify(race, null, 2)}</pre>;
}

export function Step3() {
  const [raceName, setRaceName] = React.useState("");

  return (
    <main>
      <SearchRaceForm onRaceNameChange={setRaceName} />
      <p>{raceName}</p>
      <RaceDetails />
    </main>
  );
}
