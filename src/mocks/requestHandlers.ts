import { delay, http, HttpResponse } from "msw";

const raceMock = {
  title: "R1 VINCENNES / C7 PRIX D' AMERIQUE",
  horses: [
    {
      id: "1",
      name: "INMAROSA",
      performance: "2a(23)3a4a2a2a8a5a7a9a",
      odds: 48,
    },
    {
      id: "2",
      name: "HOKKAIDO JIEL",
      performance: "7a(23)Da0a3aDa1aDa2a2a",
      odds: 87,
    },
    {
      id: "3",
      name: "EMERAUDE DE BAIS",
      performance: "(23)2a4a1aDa3a1a3a3aDa",
      odds: 76,
    },
    {
      id: "4",
      name: "HUSSARD DU LANDRET",
      performance: "4a(23)4a7a1a3a7a7a9a1a",
      odds: 17,
    },
    {
      id: "5",
      name: "IZOARD VEDAQUAIS",
      performance: "1a(23)2a2a0a1a4aDaDaDa",
      odds: 23,
    },
    {
      id: "6",
      name: "GU D'HERIPRE",
      performance: "(23)1a3a8a5a0aDaDa(22)6a",
      odds: 16,
    },
    {
      id: "7",
      name: "GO ON BOY",
      performance: "2a(23)Da2a2a1a4a7a2a2a",
      odds: 11,
    },
    {
      id: "8",
      name: "ITALIANO VERO",
      performance: "Da(23)8a7a8aDa5a5a3a9a",
      odds: 96,
    },
    {
      id: "9",
      name: "DIABLE DE VAUVERT",
      performance: "6a(23)0a0a3a5a1a5a(22)4a",
      odds: 177,
    },
    {
      id: "10",
      name: "AETOS KRONOS",
      performance: "0a(23)8a1a1a6a2a",
      odds: 193,
    },
    {
      id: "11",
      name: "AMPIA MEDE SM",
      performance: "(23)3a4a4aDa1a1a1a2a3a",
      odds: 6.9,
    },
    {
      id: "12",
      name: "IDAO DE TILLARD",
      performance: "(23)1a1a1a1a1a1aDa1a1a",
      odds: 2.7,
    },
    {
      id: "13",
      name: "HAIL MARY (SWE)",
      performance: "6a(23)0a0a1a1a2a",
      odds: 23,
    },
    {
      id: "14",
      name: "HOOKER BERRY",
      performance: "8a(23)0a5a2a5a9a3a7a1a",
      odds: 8,
    },
    {
      id: "15",
      name: "DELIA DU POMMEREUX",
      performance: "0a(23)8a2a0a0a0a0a0a8a",
      odds: 202,
    },
    {
      id: "16",
      name: "HOHNECK",
      performance: "0a(23)0a0a1a0a3a2a1a2a",
      odds: 49,
    },
    {
      id: "17",
      name: "JOVIALITY (SWE)",
      performance: "2a(23)0aDa2a1a1a",
      odds: 24,
    },
    {
      id: "18",
      name: "VIVID WISE AS",
      performance: "(23)1a1a3a1a2a1a1a1a2a",
      odds: 28,
    },
  ],
};

export const requestHandlers = [
  http.get("/api/races/:id", async ({ params }) => {
    await delay(1000);
    const { id } = params;
    if (id === "r1c7") {
      return HttpResponse.json(raceMock, { status: 200 });
    }
    return HttpResponse.json({}, { status: 404 });
  }),
];
