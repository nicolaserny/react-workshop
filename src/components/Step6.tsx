import React from "react";
import { FormEvent } from "react";
import raceApi, { Race } from "../models/raceApi";
import { createGlobalStyle } from "styled-components";

function SearchRaceForm({
  onRaceNameChange,
}: {
  onRaceNameChange: (race: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onRaceNameChange(formData.get("race") as string);
  };
  return (
    <form onSubmit={submitHandler}>
      <label>
        Race:
        <input type="text" name="race" ref={inputRef} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

function useRace(raceName: string) {
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
  return {
    race,
    isloading,
  };
}

function RaceDetails({ raceName }: { raceName: string }) {
  const { isloading, race } = useRace(raceName);
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
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Performance</th>
          <th>Odds</th>
        </tr>
        {race.horses.map((horse) => (
          <tr key={horse.id}>
            <td>{horse.id}</td>
            <td>{horse.name}</td>
            <td>{horse.performance}</td>
            <td>{horse.odds}</td>
          </tr>
        ))}
      </table>
    </section>
  );
}

export function Step6() {
  const [raceName, setRaceName] = React.useState("");

  return (
    <main>
      <GlobalStyle />
      <SearchRaceForm onRaceNameChange={setRaceName} />
      {raceName && <RaceDetails raceName={raceName} />}
    </main>
  );
}

const GlobalStyle = createGlobalStyle`
    html,
    body {
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        color: #020617;
    }

    *,
    *:before,
    *:after {
        font-family: roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        color: #020617;
    }
`;
