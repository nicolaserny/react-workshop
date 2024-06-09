import ReactDOM from "react-dom/client";
import { worker } from "./mocks/browser.ts";
import { Step1 } from "./components/Step1.tsx";

// DO NOT FORGET TO UPDATE index.html
worker.start().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(<Step1 />);
});
