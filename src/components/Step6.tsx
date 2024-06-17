import React from "react";
import { FormEvent } from "react";
import raceApi, { Race } from "../models/raceApi";
import styled, { createGlobalStyle } from "styled-components";

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
    <StyledForm onSubmit={submitHandler}>
      <StyledLabel>
        Race:
        <StyledInput type="text" name="race" ref={inputRef} />
      </StyledLabel>
      <StyledButton type="submit">Search</StyledButton>
    </StyledForm>
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
    <StyledSection>
      <h1>{race.title}</h1>
      <StyledTable>
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
              <StyledCellWithNumber>{horse.id}</StyledCellWithNumber>
              <StyledCellWithName>{horse.name}</StyledCellWithName>
              <StyledPerformance>{horse.performance}</StyledPerformance>
              <StyledCellWithNumber>{horse.odds}</StyledCellWithNumber>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledSection>
  );
}

export function Step6() {
  const [raceName, setRaceName] = React.useState("");

  return (
    <StyledMain>
      <GlobalStyle />
      <SearchRaceForm onRaceNameChange={setRaceName} />
      {raceName && <RaceDetails raceName={raceName} />}
    </StyledMain>
  );
}

const GlobalStyle = createGlobalStyle`
    html,
    body {
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        color: #020617;
        background-color: #f8fafc;
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

const StyledMain = styled.main`
  padding: 2rem;
`;

const StyledSection = styled.section`
  margin-top: 2rem;
`;

const StyledTable = styled.table`
  white-space: nowrap;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;

  th {
    text-decoration: underline;
    font-weight: 500;
    color: #020617;
    font-size: 1rem;
    padding: 1rem;
  }
  td {
    padding: 1rem;
    color: #0f172a;
    vertical-align: middle;
  }
  tr:nth-child(even) {
    background-color: #f1f5f9;
  }
  tr:hover {
    background-color: #e2e8f0;
  }
`;

const StyledCellWithNumber = styled.td`
  text-align: right;
`;

const StyledPerformance = styled.td`
  font-style: italic;
  color: #475569;
`;

const StyledCellWithName = styled.td`
  font-weight: 700;
`;

const StyledButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  &:hover {
    background-color: #1e40af;
  }
`;

const StyledInput = styled.input`
  background-color: white;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const StyledLabel = styled.label`
  margin-right: 1rem;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
`;

const StyledForm = styled.form`
  margin-bottom: 1rem;
`;
