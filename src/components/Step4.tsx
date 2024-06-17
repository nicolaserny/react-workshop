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

function RaceDetails({ raceName }: { raceName: string }) {
  // TODO - Create a custom hook called useRace(raceName: string)
  const [race, setRace] = React.useState<Race | undefined>(undefined);
  const [isloading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchRace = async () => {
      setIsLoading(true);
      const data = await raceApi.get(raceName);
      setRace(data);
      setIsLoading(false);
    };
    fetchRace();
  }, [raceName]);

  if (isloading) {
    return <div>Loading...</div>;
  }
  if (!race) {
    return <div>Race not found</div>;
  }

  return (
    <section>
      <h1>{race.title}</h1>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Performance</th>
            <th>Odds</th>
          </tr>
        </thead>
        <tbody>
          {race.horses.map((horse) => (
            <tr key={horse.id}>
              <td>{horse.id}</td>
              <td>{horse.name}</td>
              <td>{horse.performance}</td>
              <td>{horse.odds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function Step4() {
  const [raceName, setRaceName] = React.useState("");

  return (
    <main>
      <SearchRaceForm onRaceNameChange={setRaceName} />
      {raceName && <RaceDetails raceName={raceName} />}
    </main>
  );
}
